import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BookmarkCountByPostQuery } from '../query/bookmark-count-by-post/bookmark-count-by-post.query';

@Injectable()
export class BookmarkCountByPostUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async bookmarkCountByPost(postId: string): Promise<number> {
    try {
      const count = await this.queryBus.execute(
        new BookmarkCountByPostQuery(postId),
      );

      return count;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
