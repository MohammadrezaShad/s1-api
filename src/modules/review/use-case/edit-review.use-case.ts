import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { EditReviewCommand } from '@/modules/review/command/edit-review/edit-review.command';

import { EditReviewInput, EditReviewOutput } from '../dto/edit-review.dto';
import { ReviewHelepr } from '../helper/review-helper';

@Injectable()
export class EditReviewUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: ReviewHelepr,
  ) {}

  async editReview(input: EditReviewInput): Promise<EditReviewOutput> {
    try {
      await this.reviewHelepr.validateReviewId(input.id);

      await this.commandBus.execute(new EditReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
