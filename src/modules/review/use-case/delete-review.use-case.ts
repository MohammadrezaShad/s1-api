import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteReviewCommand } from '@/modules/review/command/delete-review/delete-review.command';

import {
  DeleteReviewInput,
  DeleteReviewOutput,
} from '../dto/delete-review.dto';
import { ReviewHelepr } from '../helper/review-helper';

@Injectable()
export class DeleteReviewUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: ReviewHelepr,
  ) {}

  async deleteReview(input: DeleteReviewInput): Promise<DeleteReviewOutput> {
    try {
      await this.reviewHelepr.validateReviewId(input.id);
      await this.commandBus.execute(new DeleteReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
