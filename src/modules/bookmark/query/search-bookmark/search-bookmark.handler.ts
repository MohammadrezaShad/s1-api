import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { SearchBookmarkQuery } from './search-bookmark.query';
import { SearchBookmarkOutput } from '../../dto/search-bookmark.dto';

@QueryHandler(SearchBookmarkQuery)
export class SearchBookmarkHanler
  implements IQueryHandler<SearchBookmarkQuery>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute({
    searchBookmarkInput,
  }: SearchBookmarkQuery): Promise<SearchBookmarkOutput> {
    const result = await this.bookmarkRepository.search(searchBookmarkInput);
    return result;
  }
}
