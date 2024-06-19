import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { BooleanEnum } from '@/common/enums/boolean.enum';
import { CreateAdminReviewInput } from '@/modules/review/dto/create-review.dto';
import { RemoveReviewInput } from '@/modules/review/dto/delete-review.dto';
import { EditReviewInput } from '@/modules/review/dto/edit-review.dto';
import { ReviewRateDetail } from '@/modules/review/dto/review-rate.entity';
import {
  ReviewEntity,
  TReviewEntity,
} from '@/modules/review/entity/review.entity';
import { ReviewType } from '@/modules/review/enum/review-type.enum';

import { SearchReviewInput, SearchReviewOutput } from './dto/search-review.dto';
import { UpdateReviewInput } from './dto/update-review.dto';
import { GetVotesDetailInput, VotesDetail } from './dto/votes-detail.dto';
import { ReviewEntityFactory } from './entity/review.factory';
import { ReviewModel } from './model/review.model';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(ReviewEntity.name)
    private readonly reviewModel: Model<TReviewEntity>,
    protected readonly reviewEntityFactory: ReviewEntityFactory,
  ) {}

  async search({
    count: inputCount,
    page: inputPage,
    post,
    type,
    authorEmail,
    author,
    approved,
    parent,
    user,
  }: SearchReviewInput): Promise<SearchReviewOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const hasParent = typeof parent === 'string';
    const mediaApproved =
      approved || approved === null ? approved : BooleanEnum.TRUE;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(mediaApproved && { approved: mediaApproved }),
          ...(type && { type: type }),
          ...(post && { post }),
          ...(authorEmail && { authorEmail }),
          ...(author && { author }),
          ...(user && { createUser: user }),
          ...(hasParent && { parent: parent }),
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];
    const searchResults = await this.reviewModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  async findById(id: string): Promise<ReviewModel | null> {
    const review = await this.reviewModel.findById(id).exec();
    return this.reviewEntityFactory.createFromEntity(review);
  }

  async findManyById(ids: string[]): Promise<ReviewModel[]> {
    const items = await this.reviewModel.find({ _id: { $in: ids } }).exec();
    const rvModel: ReviewModel[] = [];
    items.map(it => {
      rvModel.push(this.reviewEntityFactory.createFromEntity(it));
    });
    return rvModel;
  }

  async findManyReviewByPost(post: string): Promise<ReviewModel[]> {
    const manyReview = await this.reviewModel.find({ post: post }).exec();
    const rvModel: ReviewModel[] = [];
    manyReview.map(it => {
      rvModel.push(this.reviewEntityFactory.createFromEntity(it));
    });
    return rvModel;
  }

  async createReview(input: ReviewModel): Promise<void> {
    const newReview = new this.reviewModel(input);
    newReview.createUser = input.getCreateUser();
    await newReview.save();
  }

  async createAdminReview(
    input: CreateAdminReviewInput,
  ): Promise<TReviewEntity> {
    const newReview = new this.reviewModel(input);
    newReview._id = new ObjectId().toHexString();
    newReview.createUser = input.user;
    newReview.author = 'ادمین';
    newReview.approved = BooleanEnum.TRUE;

    await newReview.save();
    return newReview;
  }

  async update({
    id,
    ...restOfArgs
  }: UpdateReviewInput): Promise<ReviewEntity | null> {
    const review = await this.reviewModel
      .findByIdAndUpdate(id, { ...restOfArgs }, { new: true })
      .exec();
    return review;
  }

  async edit({
    id,
    content,
    user,
  }: EditReviewInput): Promise<ReviewEntity | null> {
    const review = await this.reviewModel
      .findOneAndUpdate(
        { _id: id, createUser: user },
        { content, approved: BooleanEnum.FALSE },
        { new: true },
      )
      .exec();
    return review;
  }

  async removeReview({
    id,
    user,
  }: RemoveReviewInput): Promise<ReviewEntity | null> {
    const review = await this.reviewModel
      .findOneAndDelete({ _id: id, createUser: user })
      .exec();
    return review;
  }

  async delete(id: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.reviewModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }

  async reviewCountByPost(postId: string) {
    const reviewCount = await this.reviewModel
      .findOne({ post: postId, approved: BooleanEnum.TRUE })
      .countDocuments()
      .exec();
    return reviewCount;
  }

  async getVotesDetail({
    post,
    type,
  }: GetVotesDetailInput): Promise<VotesDetail[]> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(post && { post: post }),
          type: type,
        },
      },
      {
        $group: {
          _id: { post: '$post', score: '$score' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.post',
          totalVotesCount: { $sum: '$count' },
          scoreGroup: {
            $push: {
              score: '$_id.score',
              votesCount: '$count',
            },
          },
        },
      },
      {
        $project: {
          post: '$_id',
          totalVotesCount: '$totalVotesCount',
          scoreGroup: {
            $map: {
              input: '$scoreGroup',
              as: 'item',
              in: {
                score: '$$item.score',
                votesCount: '$$item.votesCount',
                percent: {
                  $multiply: [
                    '$$item.votesCount',
                    { $divide: [100, '$totalVotesCount'] },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $sort: {
          totalVotesCount: -1,
        },
      },
    ];
    const result = await this.reviewModel.aggregate(pipeline);
    return result;
  }

  async getPostScore(
    post: string,
    type: ReviewType,
  ): Promise<ReviewRateDetail> {
    const [searchData = {}] = await this.reviewModel.aggregate([
      {
        $facet: {
          reviewStatistics: [
            {
              $match: {
                type: type,
                post: post,
              },
            },
            {
              $group: {
                _id: '$' + type,
                ratingValue: { $avg: '$score' },
                bestRating: { $max: '$score' },
                worstRating: { $min: '$score' },
                ratingCount: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);
    return searchData?.reviewStatistics[0];
  }

  async getPostScoreByUser(
    user: string,
    post: string,
    type: ReviewType,
  ): Promise<ReviewEntity> {
    const item = await this.reviewModel
      .findOne({ createUser: user, post: post, type: type })
      .exec();
    return item;
  }
}
