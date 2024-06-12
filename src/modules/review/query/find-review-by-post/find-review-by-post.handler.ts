import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindReviewByPostQuery } from '@/modules/review/query/find-review-by-post/find-review-by-post.query';

import { ReviewModel } from '../../model/review.model';
import { ReviewRepository } from '../../review.repository';

@QueryHandler(FindReviewByPostQuery)
export class FindReviewByPostHandler
  implements IQueryHandler<FindReviewByPostQuery>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute({ post }: FindReviewByPostQuery): Promise<ReviewModel[]> {
    return this.repository.findManyReviewByPost(post);
  }
}
