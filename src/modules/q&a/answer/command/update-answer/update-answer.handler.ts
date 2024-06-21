import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AnswerRepository } from '../../answer.repository';
import { UpdateAnswerCommand } from './update-answer.command';

@CommandHandler(UpdateAnswerCommand)
export class UpdateAnswerHandler
  implements ICommandHandler<UpdateAnswerCommand>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute(command: UpdateAnswerCommand) {
    const { updateAnswerInput } = command;
    await this.repository.update(updateAnswerInput);
  }
}
