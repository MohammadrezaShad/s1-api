import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateReviewCommand } from '@/modules/review/command/update-review/update-review.command';

import { ReviewRepository } from '../../review.repository';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler
  implements ICommandHandler<UpdateReviewCommand>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute(command: UpdateReviewCommand) {
    const { updateReviewInput } = command;
    await this.repository.update(updateReviewInput);
  }
}
