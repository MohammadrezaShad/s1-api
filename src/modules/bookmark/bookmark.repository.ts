import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';

import { CreateBookmarkInput } from './dto/create-bookmark.dto';
import {
  FindBookmarksByUserInput,
  FindRepeatedBookmarkInput,
} from './dto/find-bookmark.dto';
import {
  SearchBookmarkInput,
  SearchBookmarkOutput,
} from './dto/search-bookmark.dto';
import { UpdateBookmarkInput } from './dto/update-bookmark.dto';
import { BookmarkEntity, TBookmark } from './entity/bookmark.entity';
import { BookmarkEntityFactory } from './entity/bookmark.factory';
import { BookmarkModel } from './model/bookmark.model';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectModel(BookmarkEntity.name)
    private readonly bookmarkModel: Model<TBookmark>,
    protected readonly bookmarkEntityFactory: BookmarkEntityFactory,
  ) {}

  async findByPost(id: string): Promise<BookmarkModel[] | null> {
    const items = await this.bookmarkModel.find({ post: id }).exec();
    const bookmarkModel: BookmarkModel[] = [];
    items.map(it => {
      bookmarkModel.push(this.bookmarkEntityFactory.createFromEntity(it));
    });
    return bookmarkModel;
  }

  async findById(id: string): Promise<BookmarkModel | null> {
    const bookmark = await this.bookmarkModel.findById(id).exec();
    return this.bookmarkEntityFactory.createFromEntity(bookmark);
  }

  async findManyById(ids: string[]): Promise<BookmarkModel[]> {
    const items = await this.bookmarkModel.find({ _id: { $in: ids } }).exec();
    const bookmarkModel: BookmarkModel[] = [];
    items.map(it => {
      bookmarkModel.push(this.bookmarkEntityFactory.createFromEntity(it));
    });
    return bookmarkModel;
  }

  async search({
    count: inputCount,
    page: inputPage,
    type,
  }: SearchBookmarkInput): Promise<SearchBookmarkOutput> {
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
    const searchResults = await this.bookmarkModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;
    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  async createBookmark(input: BookmarkModel): Promise<void> {
    const bookmark = new this.bookmarkModel(
      this.bookmarkEntityFactory.create(input),
    );
    await bookmark.save();
  }

  public async update({
    id,
    ...restOfArgs
  }: UpdateBookmarkInput): Promise<void> {
    await this.bookmarkModel
      .findByIdAndUpdate(id, { ...restOfArgs }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.bookmarkModel.findByIdAndDelete(id).exec();
  }

  async deleteOne(postId: string, user?: string): Promise<void> {
    await this.bookmarkModel
      .findOneAndDelete({
        $and: [{ user: { $eq: user } }, { post: { $eq: postId } }],
      })
      .exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.bookmarkModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }

  async checkRepeatedBookmarkByUser({
    user,
    post,
    type,
  }: FindRepeatedBookmarkInput | CreateBookmarkInput): Promise<boolean> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          $and: [
            { user: { $eq: user } },
            { post: { $eq: post } },
            { type: { $eq: type } },
          ],
        },
      },
    ];
    const repeatedBookmark = await this.bookmarkModel.aggregate(pipeline);
    return repeatedBookmark.length ? true : false;
  }

  async countByPost(postId: string) {
    return this.bookmarkModel.find({ post: postId }).countDocuments().exec();
  }

  async getBookmarksByUser({
    user,
  }: FindBookmarksByUserInput): Promise<BookmarkModel[] | null> {
    const bookmarks = await this.bookmarkModel.find({ user: user }).exec();
    const bookmarkModel: BookmarkModel[] = [];
    bookmarks.map(it => {
      bookmarkModel.push(this.bookmarkEntityFactory.createFromEntity(it));
    });
    return bookmarkModel;
  }
}
