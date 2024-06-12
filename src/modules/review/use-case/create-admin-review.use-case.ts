import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateAdminReviewCommand } from '@/modules/review/command/create-admin-review/create-review.command';

import {
  CreateAdminReviewInput,
  CreateReviewOutput,
} from '../dto/create-review.dto';

@Injectable()
export class CreateAdminReviewUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createAdminReview(
    input: CreateAdminReviewInput,
  ): Promise<CreateReviewOutput> {
    try {
      await this.commandBus.execute(new CreateAdminReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
