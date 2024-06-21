import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AnswerRepository } from '../../answer.repository';
import { DeleteAnswerCommand } from './delete-answer.command';

@CommandHandler(DeleteAnswerCommand)
export class DeleteAnswerHandler
  implements ICommandHandler<DeleteAnswerCommand>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute(command: DeleteAnswerCommand) {
    const { deleteAnswerInput } = command;
    await this.repository.delete(deleteAnswerInput.id);
  }
}
