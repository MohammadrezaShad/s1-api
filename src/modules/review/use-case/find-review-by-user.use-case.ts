import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyReviewOutput } from '../dto/find-review.dto';
import { ReviewEntityFactory } from '../entity/review.factory';
import { ReviewModel } from '../model/review.model';
import { FindReviewByUserQuery } from '../query/find-review-by-user/find-review-by-user.query';

@Injectable()
export class FindReviewByUserUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reviewEntityFactory: ReviewEntityFactory,
  ) {}

  async findReviewByUser(user: string): Promise<FindManyReviewOutput> {
    try {
      const manyReview: ReviewModel[] = await this.queryBus.execute(
        new FindReviewByUserQuery(user),
      );

      const resultList = manyReview.map(model =>
        this.reviewEntityFactory.create(model),
      );

      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
