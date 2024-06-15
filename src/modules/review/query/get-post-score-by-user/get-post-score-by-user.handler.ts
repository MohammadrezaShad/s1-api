import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReviewEntity } from '@/modules/review/entity/review.entity';
import { GetPostScoreByUserQuery } from '@/modules/review/query/get-post-score-by-user/get-post-score-by-user.query';

import { ReviewRepository } from '../../review.repository';

@QueryHandler(GetPostScoreByUserQuery)
export class GetPostScoreByUserHandler
  implements IQueryHandler<GetPostScoreByUserQuery>
{
  constructor(private readonly repository: ReviewRepository) {}
  async execute({
    user,
    post,
    type,
  }: GetPostScoreByUserQuery): Promise<ReviewEntity> {
    return this.repository.getPostScoreByUser(user, post, type);
  }
}
