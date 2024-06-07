import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { BookmarkModel } from '../../model/bookmark.model';
import { GetBookmarksByUserQuery } from './get-bookmarks-by-user.query';

@QueryHandler(GetBookmarksByUserQuery)
export class GetBookmarksByUserHandler
  implements IQueryHandler<GetBookmarksByUserQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({
    findBookmarksByUserInput,
  }: GetBookmarksByUserQuery): Promise<BookmarkModel[]> {
    return this.bookmarkRepository.getBookmarksByUser(findBookmarksByUserInput);
  }
}
