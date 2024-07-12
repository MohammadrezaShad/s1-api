import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReviewModel } from '../../model/review.model';
import { ReviewRepository } from '../../review.repository';
import { FindReviewByUserQuery } from './find-review-by-user.query';

@QueryHandler(FindReviewByUserQuery)
export class FindReviewByUserHandler
  implements IQueryHandler<FindReviewByUserQuery>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute({ user }: FindReviewByUserQuery): Promise<ReviewModel[]> {
    return this.repository.findManyReviewByUser(user);
  }
}
