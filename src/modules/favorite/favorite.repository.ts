import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { CreateFavoriteInput } from '@/modules/favorite/dto/create-favorite.dto';
import { FindRepeatedFavoriteInput } from '@/modules/favorite/dto/find-favorite.dto';
import {
  SearchFavoriteInput,
  SearchFavoriteOutput,
} from '@/modules/favorite/dto/search-favorite.dto';
import { UpdateFavoriteInput } from '@/modules/favorite/dto/update-favorite.dto';
import {
  FavoriteEntity,
  TFavorite,
} from '@/modules/favorite/entity/favorite.entity';
import { FavoriteEntityFactory } from '@/modules/favorite/entity/favorite.factory';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectModel(FavoriteEntity.name)
    private readonly favModel: Model<TFavorite>,
    protected readonly favEntityFactory: FavoriteEntityFactory,
  ) {}

  async findByPost(id: string): Promise<FavoriteModel[] | null> {
    const items = await this.favModel.find({ post: id }).exec();
    const favoriteModel: FavoriteModel[] = [];
    items.map(it => {
      favoriteModel.push(this.favEntityFactory.createFromEntity(it));
    });
    return favoriteModel;
  }

  async findById(id: string): Promise<FavoriteModel | null> {
    const favorite = await this.favModel.findById(id).exec();
    return this.favEntityFactory.createFromEntity(favorite);
  }

  async findManyById(ids: string[]): Promise<FavoriteModel[]> {
    const items = await this.favModel.find({ _id: { $in: ids } }).exec();
    const favoriteModel: FavoriteModel[] = [];
    items.map(it => {
      favoriteModel.push(this.favEntityFactory.createFromEntity(it));
    });
    return favoriteModel;
  }

  async search({
    count: inputCount,
    page: inputPage,
    type,
  }: SearchFavoriteInput): Promise<SearchFavoriteOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(type && { type: type }),
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
    const searchResults = await this.favModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;

    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  async createFavorite(input: FavoriteModel): Promise<void> {
    const favorite = new this.favModel(this.favEntityFactory.create(input));
    await favorite.save();
  }

  public async update({
    id,
    ...restOfArgs
  }: UpdateFavoriteInput): Promise<void> {
    await this.favModel
      .findByIdAndUpdate(id, { ...restOfArgs }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.favModel.findByIdAndDelete(id).exec();
  }

  async deleteOne(postId: string, user?: string): Promise<void> {
    await this.favModel
      .findOneAndDelete({
        $and: [
          // {
          //   ...(user ? [{ user: { $eq: user } }] : []),
          // },
          { user: { $eq: user } },
          { post: { $eq: postId } },
        ],
      })
      .exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.favModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }

  async checkRepeatedFavoriteByUser({
    user,
    post,
    type,
  }: FindRepeatedFavoriteInput | CreateFavoriteInput): Promise<boolean> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          $and: [
            // {
            //   ...(user ? [{ user: { $eq: user } }] : []),
            // },
            { user: { $eq: user } },
            { post: { $eq: post } },
            { type: { $eq: type } },
          ],
        },
      },
    ];
    const repeatedFavorite = await this.favModel.aggregate(pipeline);
    return repeatedFavorite.length ? true : false;
  }

  async countByPost(postId: string) {
    return this.favModel.find({ post: postId }).countDocuments().exec();
  }
}
