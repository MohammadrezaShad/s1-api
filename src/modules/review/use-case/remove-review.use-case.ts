import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { RemoveReviewCommand } from '@/modules/review/command/remove-review/remove-review.command';

import {
  DeleteReviewOutput,
  RemoveReviewInput,
} from '../dto/delete-review.dto';
import { ReviewHelepr } from '../helper/review-helper';

@Injectable()
export class RemoveReviewUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: ReviewHelepr,
  ) {}

  async removeReview(input: RemoveReviewInput): Promise<DeleteReviewOutput> {
    try {
      await this.reviewHelepr.validateReviewId(input.id);

      await this.commandBus.execute(new RemoveReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
