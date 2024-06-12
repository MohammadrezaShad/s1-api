import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateReviewCommand } from '@/modules/review/command/create-review/create-review.command';

import {
  CreateReviewInput,
  CreateReviewOutput,
} from '../dto/create-review.dto';

@Injectable()
export class CreateReviewUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createReview(input: CreateReviewInput): Promise<CreateReviewOutput> {
    try {
      await this.commandBus.execute(new CreateReviewCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
