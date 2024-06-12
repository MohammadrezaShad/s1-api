import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchReviewQuery } from '@/modules/review/query/search-review/search-review.query';

import { SearchReviewOutput } from '../../dto/search-review.dto';
import { ReviewRepository } from '../../review.repository';

@QueryHandler(SearchReviewQuery)
export class SearchReviewHanler implements IQueryHandler<SearchReviewQuery> {
  constructor(private readonly repository: ReviewRepository) {}

  async execute({
    searchReviewInput,
  }: SearchReviewQuery): Promise<SearchReviewOutput> {
    const result = await this.repository.search(searchReviewInput);
    return result;
  }
}
