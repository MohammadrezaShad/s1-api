import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { FindBookmarkByIdQuery } from './find-bookmark-by-id.query';
import { BookmarkModel } from '../../model/bookmark.model';

@QueryHandler(FindBookmarkByIdQuery)
export class FindBookmarkByIdHandler
  implements IQueryHandler<FindBookmarkByIdQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({ id }: FindBookmarkByIdQuery): Promise<BookmarkModel | null> {
    return this.bookmarkRepository.findById(id);
  }
}
