import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchBusinessInput,
  SearchBusinessOutput,
} from '../dto/search-business.dto';
import { SearchBusinessQuery } from '../query/search-business/search-business.query';

@Injectable()
export class SearchBusinessUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchBusinessInput: SearchBusinessInput,
  ): Promise<SearchBusinessOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchBusinessOutput =
        await this.queryBus.execute(
          new SearchBusinessQuery(searchBusinessInput),
        );

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
