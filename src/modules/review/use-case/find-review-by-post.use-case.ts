import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindReviewByPostQuery } from '@/modules/review/query/find-review-by-post/find-review-by-post.query';

import {
  FindManyReviewByPostInput,
  FindManyReviewOutput,
} from '../dto/find-review.dto';
import { ReviewEntityFactory } from '../entity/review.factory';
import { ReviewModel } from '../model/review.model';

@Injectable()
export class FindReviewByPostUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reviewEntityFactory: ReviewEntityFactory,
  ) {}

  async findReviewByPost({
    post,
  }: FindManyReviewByPostInput): Promise<FindManyReviewOutput> {
    try {
      const manyReview: ReviewModel[] = await this.queryBus.execute(
        new FindReviewByPostQuery(post),
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
