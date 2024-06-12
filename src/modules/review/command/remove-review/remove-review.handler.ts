import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveReviewCommand } from '@/modules/review/command/remove-review/remove-review.command';

import { ReviewRepository } from '../../review.repository';

@CommandHandler(RemoveReviewCommand)
export class RemoveReviewHandler
  implements ICommandHandler<RemoveReviewCommand>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute(command: RemoveReviewCommand) {
    const { removeReviewInput } = command;
    await this.repository.removeReview(removeReviewInput);
  }
}
