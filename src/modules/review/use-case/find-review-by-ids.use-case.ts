import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyReviewInput,
  FindManyReviewOutput,
} from '../dto/find-review.dto';
import { ReviewEntityFactory } from '../entity/review.factory';
import { ReviewModel } from '../model/review.model';
import { FindReviewByIdsQuery } from '../query/find-review-by-ids/find-review-by-ids.query';

@Injectable()
export class FindReviewByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reviewEntityFactory: ReviewEntityFactory,
  ) {}

  async findReviewByIds({
    ids,
  }: FindManyReviewInput): Promise<FindManyReviewOutput> {
    try {
      const manyReview: ReviewModel[] = await this.queryBus.execute(
        new FindReviewByIdsQuery(ids),
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
