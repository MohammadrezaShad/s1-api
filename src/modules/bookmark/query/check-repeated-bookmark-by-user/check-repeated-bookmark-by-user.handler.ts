import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { FindRepeatedBookmarkQuery } from './check-repeated-bookmark-by-user.query';

@QueryHandler(FindRepeatedBookmarkQuery)
export class CheckRepeatedBookmarkByUserHandler
  implements IQueryHandler<FindRepeatedBookmarkQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({
    findRepeatedBookmarkInput,
  }: FindRepeatedBookmarkQuery): Promise<boolean> {
    return this.bookmarkRepository.checkRepeatedBookmarkByUser(
      findRepeatedBookmarkInput,
    );
  }
}
