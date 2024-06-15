import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { reverse } from 'dns';

import { ReviewEntity } from '@/modules/review/entity/review.entity';
import { GetPostScoreByUserQuery } from '@/modules/review/query/get-post-score-by-user/get-post-score-by-user.query';

import { ReviewType } from '../enum/review-type.enum';

@Injectable()
export class GetPostScoreByUserUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async getPostScoreByUser(
    user: string,
    post: string,
    type: ReviewType,
  ): Promise<ReviewEntity> {
    try {
      const result: ReviewEntity = await this.queryBus.execute(
        new GetPostScoreByUserQuery(user, post, type),
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
