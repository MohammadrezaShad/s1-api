import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAnswerCommand } from './create-answer.command';
import { AnswerModelFactory } from '../../model/answer-model.factory';

@CommandHandler(CreateAnswerCommand)
export class CreateAnswerHandler
  implements ICommandHandler<CreateAnswerCommand>
{
  constructor(private readonly factory: AnswerModelFactory) {}
  async execute(command: CreateAnswerCommand) {
    const { createAnswerInput } = command;

    await this.factory.create(createAnswerInput);
  }
}
