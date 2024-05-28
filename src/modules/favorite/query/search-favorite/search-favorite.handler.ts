import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchFavoriteOutput } from '@/modules/favorite/dto/search-favorite.dto';
import { SearchFavoriteQuery } from '@/modules/favorite/query/search-favorite/search-favorite.query';

import { FavoriteRepository } from '../../favorite.repository';

@QueryHandler(SearchFavoriteQuery)
export class SearchFavoriteHanler
  implements IQueryHandler<SearchFavoriteQuery>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute({
    searchFavoriteInput,
  }: SearchFavoriteQuery): Promise<SearchFavoriteOutput> {
    const result = await this.favoriteRepository.search(searchFavoriteInput);
    return result;
  }
}
