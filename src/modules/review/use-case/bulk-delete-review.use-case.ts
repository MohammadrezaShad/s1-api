import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteReviewCommand } from '@/modules/review/command/bulk-delete-review/bulk-delete-review.command';

import {
  DeleteManyReviewInput,
  DeleteReviewOutput,
} from '../dto/delete-review.dto';
import { ReviewHelepr } from '../helper/review-helper';

@Injectable()
export class BulkDeleteReviewUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: ReviewHelepr,
  ) {}

  async bulkDeleteReview(
    input: DeleteManyReviewInput,
  ): Promise<DeleteReviewOutput> {
    try {
      for (const id of input.ids) {
        await this.reviewHelepr.validateReviewId(id);
      }
      await this.commandBus.execute(new BulkDeleteReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
