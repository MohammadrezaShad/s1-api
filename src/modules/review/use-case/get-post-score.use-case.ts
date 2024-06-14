import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ReviewType } from '../enum/review-type.enum';
import { ReviewRateDetail } from '../dto/review-rate.entity';
import { GetPostScoreQuery } from '../query/get-post-score/get-post-score.query';

@Injectable()
export class GetPostScoreUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async getPostScore(
    post: string,
    type: ReviewType,
  ): Promise<ReviewRateDetail> {
    try {
      const result: ReviewRateDetail = await this.queryBus.execute(
        new GetPostScoreQuery(post, type),
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
