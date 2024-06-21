import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchAnswerInput,
  SearchAnswerOutput,
} from '../dto/search-answer.dto';
import { SearchAnswerQuery } from '../query/search-answer/search-answer.query';

@Injectable()
export class SearchAnswerUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(searchInput: SearchAnswerInput): Promise<SearchAnswerOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchAnswerOutput =
        await this.queryBus.execute(new SearchAnswerQuery(searchInput));
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
