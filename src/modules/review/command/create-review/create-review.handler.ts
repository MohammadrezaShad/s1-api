import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateReviewCommand } from '@/modules/review/command/create-review/create-review.command';

import { ReviewModelFactory } from '../../model/review-model.factory';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler
  implements ICommandHandler<CreateReviewCommand>
{
  constructor(private readonly factory: ReviewModelFactory) {}
  async execute(command: CreateReviewCommand) {
    const { createReviewInput } = command;

    await this.factory.create(createReviewInput);
  }
}
