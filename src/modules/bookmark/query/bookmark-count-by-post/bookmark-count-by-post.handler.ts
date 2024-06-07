import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { BookmarkCountByPostQuery } from './bookmark-count-by-post.query';

@QueryHandler(BookmarkCountByPostQuery)
export class BookmarkCountByPostHandler
  implements IQueryHandler<BookmarkCountByPostQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({ postId }: BookmarkCountByPostQuery): Promise<number> {
    return this.bookmarkRepository.countByPost(postId);
  }
}
