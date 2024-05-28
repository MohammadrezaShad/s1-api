import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchFavoriteInput,
  SearchFavoriteOutput,
} from '@/modules/favorite/dto/search-favorite.dto';
import { SearchFavoriteQuery } from '@/modules/favorite/query/search-favorite/search-favorite.query';

@Injectable()
export class SearchFavoriteUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchFavInput: SearchFavoriteInput,
  ): Promise<SearchFavoriteOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchFavoriteOutput =
        await this.queryBus.execute(new SearchFavoriteQuery(searchFavInput));

      return {
        success,
        results: results,
        totalCount,
        totalPages,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
