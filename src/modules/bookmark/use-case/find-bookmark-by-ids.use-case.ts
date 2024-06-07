import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { BookmarkEntityFactory } from '../entity/bookmark.factory';
import {
  FindBookmarksInput,
  FindBookmarksOutput,
} from '../dto/find-bookmark.dto';
import { BookmarkModel } from '../model/bookmark.model';
import { FindBookmarkByIdsQuery } from '../query/find-bookmark-by-ids/find-bookmark-by-ids.query';

@Injectable()
export class FindBookmarkByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly bookmarkEntityFactory: BookmarkEntityFactory,
  ) {}

  async findBookmarkByIds({
    ids,
  }: FindBookmarksInput): Promise<FindBookmarksOutput> {
    try {
      const bookmarks: BookmarkModel[] = await this.queryBus.execute(
        new FindBookmarkByIdsQuery(ids),
      );

      const resultList = bookmarks.map(model =>
        this.bookmarkEntityFactory.create(model),
      );

      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
