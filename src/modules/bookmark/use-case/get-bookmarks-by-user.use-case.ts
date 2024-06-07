import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { BookmarkEntityFactory } from '../entity/bookmark.factory';
import {
  FindBookmarksByUserInput,
  FindBookmarksOutput,
} from '../dto/find-bookmark.dto';
import { BookmarkModel } from '../model/bookmark.model';
import { BOOKMARK_NOT_FOUND } from '../constant/error-message.constant';
import { GetBookmarksByUserQuery } from '../query/get-bookmarks-by-user/get-bookmarks-by-user.query';

@Injectable()
export class GetBookmarksByUserUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly bookmarkEntityFactory: BookmarkEntityFactory,
  ) {}

  async getBookmarksByUser(
    input: FindBookmarksByUserInput,
  ): Promise<FindBookmarksOutput> {
    try {
      const bookmarks: BookmarkModel[] = await this.queryBus.execute(
        new GetBookmarksByUserQuery(input),
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
