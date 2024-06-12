import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BulkDeleteReviewCommand } from '@/modules/review/command/bulk-delete-review/bulk-delete-review.command';

import { ReviewRepository } from '../../review.repository';

@CommandHandler(BulkDeleteReviewCommand)
export class BulkDeleteReviewHandler
  implements ICommandHandler<BulkDeleteReviewCommand>
{
  constructor(private readonly repository: ReviewRepository) {}

  async execute(command: BulkDeleteReviewCommand) {
    const { deleteManyReviewInput } = command;

    await this.repository.bulkDelete(deleteManyReviewInput.ids);
  }
}
