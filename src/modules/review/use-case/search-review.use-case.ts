import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SearchReviewQuery } from '@/modules/review/query/search-review/search-review.query';

import {
  SearchReviewInput,
  SearchReviewOutput,
} from '../dto/search-review.dto';

@Injectable()
export class SearchReviewUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(searchInput: SearchReviewInput): Promise<SearchReviewOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchReviewOutput =
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

  // async statistic(postId: string[]): Promise<ReviewRateDetail[]> {
  //   try {
  //     const result: ReviewRateDetail[] = await this.repo.getReviewStatistics(
  //       postId,
  //       ReviewType.BUSINESS,
  //     );
  //     return result.map(obj => {
  //       return { ...obj, ratingValue: parseFloat(obj.ratingValue.toFixed(1)) };
  //     });
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
