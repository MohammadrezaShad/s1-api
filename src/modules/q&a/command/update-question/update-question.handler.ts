import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { QuestionRepository } from '../../question.repository';
import { UpdateQuestionCommand } from './update-question.command';

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler
  implements ICommandHandler<UpdateQuestionCommand>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute(command: UpdateQuestionCommand) {
    const { updateQuestionInput } = command;
    await this.repository.update(updateQuestionInput);
  }
}
