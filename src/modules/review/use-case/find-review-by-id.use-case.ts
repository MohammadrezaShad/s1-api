import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { REVIEW_NOT_FOUND } from '../constant/error-message.constant';
import { FindReviewInput, FindReviewOutput } from '../dto/find-review.dto';
import { ReviewEntityFactory } from '../entity/review.factory';
import { ReviewModel } from '../model/review.model';
import { FindReviewByIdQuery } from '../query/find-review-by-id/find-review-by-id.query';

@Injectable()
export class FindReviewByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reviewEntityFactory: ReviewEntityFactory,
  ) {}

  async findReviewById({ id }: FindReviewInput): Promise<FindReviewOutput> {
    try {
      const review: ReviewModel = await this.queryBus.execute(
        new FindReviewByIdQuery(id),
      );
      if (!review) {
        throw new NotFoundException(REVIEW_NOT_FOUND);
      }

      return {
        success: true,
        result: this.reviewEntityFactory.create(review),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
