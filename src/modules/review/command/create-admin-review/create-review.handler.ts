import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAdminReviewCommand } from '@/modules/review/command/create-admin-review/create-review.command';

import { ReviewRepository } from '../../review.repository';

@CommandHandler(CreateAdminReviewCommand)
export class CreateAdminReviewHandler
  implements ICommandHandler<CreateAdminReviewCommand>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute(command: CreateAdminReviewCommand) {
    const { createAdminReviewInput } = command;

    await this.repository.createAdminReview(createAdminReviewInput);
  }
}
