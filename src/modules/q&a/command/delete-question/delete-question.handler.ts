import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { QuestionRepository } from '../../question.repository';
import { DeleteQuestionCommand } from './delete-question.command';

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler
  implements ICommandHandler<DeleteQuestionCommand>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute(command: DeleteQuestionCommand) {
    const { deleteQuestionInput } = command;
    await this.repository.delete(deleteQuestionInput.id);
  }
}
