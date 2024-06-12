import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindReviewByIdQuery } from '@/modules/review/query/find-review-by-id/find-review-by-id.query';

import { ReviewModel } from '../../model/review.model';
import { ReviewRepository } from '../../review.repository';

@QueryHandler(FindReviewByIdQuery)
export class FindReviewByIdHandler
  implements IQueryHandler<FindReviewByIdQuery>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute({ id }: FindReviewByIdQuery): Promise<ReviewModel | null> {
    return this.repository.findById(id);
  }
}
