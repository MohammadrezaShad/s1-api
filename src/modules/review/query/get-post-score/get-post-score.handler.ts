import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReviewRepository } from '../../review.repository';
import { GetPostScoreQuery } from './get-post-score.query';
import { ReviewRateDetail } from '../../dto/review-rate.entity';

@QueryHandler(GetPostScoreQuery)
export class GetPostScoreHandler implements IQueryHandler<GetPostScoreQuery> {
  constructor(private readonly repository: ReviewRepository) {}
  async execute({ post, type }: GetPostScoreQuery): Promise<ReviewRateDetail> {
    return this.repository.getPostScore(post, type);
  }
}
