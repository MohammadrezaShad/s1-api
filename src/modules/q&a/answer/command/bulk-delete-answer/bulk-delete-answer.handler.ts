import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AnswerRepository } from '../../answer.repository';
import { BulkDeleteAnswerCommand } from './bulk-delete-answer.command';

@CommandHandler(BulkDeleteAnswerCommand)
export class BulkDeleteAnswerHandler
  implements ICommandHandler<BulkDeleteAnswerCommand>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute(command: BulkDeleteAnswerCommand) {
    const { deleteManyAnswerInput } = command;

    await this.repository.bulkDelete(deleteManyAnswerInput.ids);
  }
}
