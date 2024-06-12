import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteReviewCommand } from '@/modules/review/command/delete-review/delete-review.command';

import { ReviewRepository } from '../../review.repository';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler
  implements ICommandHandler<DeleteReviewCommand>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute(command: DeleteReviewCommand) {
    const { deleteReviewInput } = command;
    await this.repository.delete(deleteReviewInput.id);
  }
}
