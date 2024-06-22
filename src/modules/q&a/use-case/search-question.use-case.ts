import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SearchQuestionQuery } from '@/modules/q&a/query/search-question/search-question.query';

import {
  SearchQuestionInput,
  SearchQuestionOutput,
} from '../dto/search-question.dto';

@Injectable()
export class SearchQuestionUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchInput: SearchQuestionInput,
  ): Promise<SearchQuestionOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchQuestionOutput =
        await this.queryBus.execute(new SearchQuestionQuery(searchInput));
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
