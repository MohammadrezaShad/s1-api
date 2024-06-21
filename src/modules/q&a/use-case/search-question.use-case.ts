import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SearchReviewQuery } from '@/modules/review/query/search-review/search-review.query';

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
        await this.queryBus.execute(new SearchReviewQuery(searchInput));
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
