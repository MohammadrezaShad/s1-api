import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { QuestionModelFactory } from '../../model/question-model.factory';
import { CreateQuestionCommand } from './create-question.command';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler
  implements ICommandHandler<CreateQuestionCommand>
{
  constructor(private readonly factory: QuestionModelFactory) {}
  async execute(command: CreateQuestionCommand) {
    const { createQuestionInput } = command;

    await this.factory.create(createQuestionInput);
  }
}
