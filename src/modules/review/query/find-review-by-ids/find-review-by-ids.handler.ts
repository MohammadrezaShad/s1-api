import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReviewModel } from '../../model/review.model';
import { ReviewRepository } from '../../review.repository';
import { FindReviewByIdsQuery } from './find-review-by-ids.query';

@QueryHandler(FindReviewByIdsQuery)
export class FindReviewByIdsHandler
  implements IQueryHandler<FindReviewByIdsQuery>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute({ ids }: FindReviewByIdsQuery): Promise<ReviewModel[]> {
    return this.repository.findManyById(ids);
  }
}
