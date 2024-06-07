import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { FindBookmarkByPostQuery } from './find-bookmark-by-post.query';
import { BookmarkModel } from '../../model/bookmark.model';

@QueryHandler(FindBookmarkByPostQuery)
export class FindBookmarkByPostHandler
  implements IQueryHandler<FindBookmarkByPostQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({ post }: FindBookmarkByPostQuery): Promise<BookmarkModel[]> {
    return this.bookmarkRepository.findByPost(post);
  }
}
