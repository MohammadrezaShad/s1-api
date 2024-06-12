import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EditReviewCommand } from '@/modules/review/command/edit-review/edit-review.command';

import { ReviewRepository } from '../../review.repository';

@CommandHandler(EditReviewCommand)
export class EditReviewHandler implements ICommandHandler<EditReviewCommand> {
  constructor(private readonly repository: ReviewRepository) {}

  async execute(command: EditReviewCommand) {
    const { editReviewInput } = command;
    await this.repository.edit(editReviewInput);
  }
}
