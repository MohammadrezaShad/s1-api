import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AnswerModelFactory } from '../../model/answer-model.factory';
import { CreateAnswerCommand } from './create-answer.command';

@CommandHandler(CreateAnswerCommand)
export class CreateAnswerHandler
  implements ICommandHandler<CreateAnswerCommand>
{
  constructor(private readonly factory: AnswerModelFactory) {}
  async execute(command: CreateAnswerCommand): Promise<string> {
    const { createAnswerInput } = command;
    const answer = await this.factory.create(createAnswerInput);
    return answer.getId();
  }
}
