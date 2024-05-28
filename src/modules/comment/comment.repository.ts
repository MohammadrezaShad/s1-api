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
import { SearchData } from '@/common/interfaces/search.data.interface';

import { CreateAdminCommentInput } from './dto/create-comment.dto';
import { RemoveCommentInput } from './dto/delete-comment.dto';
import { EditCommentInput } from './dto/edit-comment.dto';
import {
  SearchCommentInput,
  SearchCommentOutput,
} from './dto/search-comment.dto';
import { UpdateCommentInput } from './dto/update-comment.dto';
import { CommentEntity, TCommentEntity } from './entity/comment.entity';
import { CommentEntityFactory } from './entity/comment.factory';
import { CommentModel } from './model/comment.model';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentEntity.name)
    private readonly commentModel: Model<TCommentEntity>,
    protected readonly commentEntityFactory: CommentEntityFactory,
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
  }: SearchCommentInput): Promise<SearchCommentOutput> {
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
    const searchResults = await this.commentModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  async findById(id: string): Promise<CommentModel | null> {
    const comment = await this.commentModel.findById(id).exec();
    return this.commentEntityFactory.createFromEntity(comment);
  }

  async findManyById(ids: string[]): Promise<CommentModel[]> {
    const items = await this.commentModel.find({ _id: { $in: ids } }).exec();
    const commentModel: CommentModel[] = [];
    items.map(it => {
      commentModel.push(this.commentEntityFactory.createFromEntity(it));
    });
    return commentModel;
  }

  async findCommentsByPost(id: string): Promise<CommentModel[]> {
    const comments = await this.commentModel.find({ post: id }).exec();
    const commentModel: CommentModel[] = [];
    comments.map(it => {
      commentModel.push(this.commentEntityFactory.createFromEntity(it));
    });
    return commentModel;
  }

  async createComment(input: CommentModel): Promise<void> {
    const newComment = new this.commentModel(input);

    newComment.createUser = input.getCreateUser();

    await newComment.save();
  }

  async createAdminComment(
    input: CreateAdminCommentInput,
  ): Promise<TCommentEntity> {
    const newComment = new this.commentModel(input);
    newComment._id = new ObjectId().toHexString();
    newComment.createUser = input.user;
    newComment.author = 'ادمین';
    newComment.approved = BooleanEnum.TRUE;

    await newComment.save();
    return newComment;
  }

  async update({
    commentId,
    ...restOfArgs
  }: UpdateCommentInput): Promise<CommentEntity | null> {
    const comment = await this.commentModel
      .findByIdAndUpdate(commentId, { ...restOfArgs }, { new: true })
      .exec();
    return comment;
  }

  async edit({
    commentId,
    content,
    user,
  }: EditCommentInput): Promise<CommentEntity | null> {
    const comment = await this.commentModel
      .findOneAndUpdate(
        { _id: commentId, createUser: user },
        { content, approved: BooleanEnum.FALSE },
        { new: true },
      )
      .exec();
    return comment;
  }

  async removeComment({
    commentId,
    user,
  }: RemoveCommentInput): Promise<CommentEntity | null> {
    console.log({
      commentId: commentId,
      user: user,
    });
    const comment = await this.commentModel
      .findOneAndDelete({ _id: commentId, createUser: user })
      .exec();
    return comment;
  }

  async delete(commentId: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(commentId).exec();
  }

  async bulkDelete(commentIds: string[]): Promise<boolean> {
    const wereRemoved = await this.commentModel.deleteMany({
      _id: { $in: commentIds },
    });
    return wereRemoved.acknowledged;
  }

  async commentCountByPost(postId: string) {
    const comment = await this.commentModel
      .findOne({ post: postId, approved: BooleanEnum.TRUE })
      .countDocuments()
      .exec();
    return comment;
  }
}
