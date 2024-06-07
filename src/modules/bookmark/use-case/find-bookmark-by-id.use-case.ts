import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { BookmarkEntityFactory } from '../entity/bookmark.factory';
import {
  FindBookmarkInput,
  FindBookmarkOutput,
} from '../dto/find-bookmark.dto';
import { BookmarkModel } from '../model/bookmark.model';
import { FindBookmarkByIdQuery } from '../query/find-bookmark-by-id/find-bookmark-by-id.query';
import { BOOKMARK_NOT_FOUND } from '../constant/error-message.constant';
@Injectable()
export class FindBookmarkByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly bookmarkEntityFactory: BookmarkEntityFactory,
  ) {}

  async findBookmarkById({
    id,
  }: FindBookmarkInput): Promise<FindBookmarkOutput> {
    try {
      const bookmark: BookmarkModel = await this.queryBus.execute(
        new FindBookmarkByIdQuery(id),
      );
      if (!bookmark) {
        throw new NotFoundException(BOOKMARK_NOT_FOUND);
      }

      return {
        success: true,
        result: this.bookmarkEntityFactory.create(bookmark),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
