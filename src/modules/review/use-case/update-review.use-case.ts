import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateReviewCommand } from '../command/update-review/update-review.command';
import {
  UpdateReviewInput,
  UpdateReviewOutput,
} from '../dto/update-review.dto';
import { ReviewHelepr } from '../helper/review-helper';

@Injectable()
export class UpdateReviewUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: ReviewHelepr,
  ) {}

  async updateReview(input: UpdateReviewInput): Promise<UpdateReviewOutput> {
    try {
      await this.reviewHelepr.validateReviewId(input.id);

      await this.commandBus.execute(new UpdateReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
