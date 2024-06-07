import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { BookmarkEntityFactory } from '../entity/bookmark.factory';
import { FindBookmarksOutput } from '../dto/find-bookmark.dto';
import { BookmarkModel } from '../model/bookmark.model';
import { FindBookmarkByPostQuery } from '../query/find-bookmark-by-post/find-bookmark-by-post.query';

@Injectable()
export class FindBookmarkByPostUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly bookmarkEntityFactory: BookmarkEntityFactory,
  ) {}

  async findBookmarkByPost(post: string): Promise<FindBookmarksOutput> {
    try {
      const bookmarks: BookmarkModel[] = await this.queryBus.execute(
        new FindBookmarkByPostQuery(post),
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
