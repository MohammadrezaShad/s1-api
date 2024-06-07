import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { FindBookmarkByIdsQuery } from './find-bookmark-by-ids.query';
import { BookmarkModel } from '../../model/bookmark.model';

@QueryHandler(FindBookmarkByIdsQuery)
export class FindBookmarkByIdsHandler
  implements IQueryHandler<FindBookmarkByIdsQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({ ids }: FindBookmarkByIdsQuery): Promise<BookmarkModel[]> {
    return this.bookmarkRepository.findManyById(ids);
  }
}
