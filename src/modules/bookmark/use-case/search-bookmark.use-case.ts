import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchBookmarkInput,
  SearchBookmarkOutput,
} from '../dto/search-bookmark.dto';
import { SearchBookmarkQuery } from '../query/search-bookmark/search-bookmark.query';

@Injectable()
export class SearchBookmarkUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchBookmarkInput: SearchBookmarkInput,
  ): Promise<SearchBookmarkOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchBookmarkOutput =
        await this.queryBus.execute(
          new SearchBookmarkQuery(searchBookmarkInput),
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
