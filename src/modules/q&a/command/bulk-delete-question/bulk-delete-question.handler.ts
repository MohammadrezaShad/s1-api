import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { QuestionRepository } from '../../question.repository';
import { BulkDeleteQuestionCommand } from './bulk-delete-question.command';

@CommandHandler(BulkDeleteQuestionCommand)
export class BulkDeleteQuestionHandler
  implements ICommandHandler<BulkDeleteQuestionCommand>
{
  constructor(private readonly repository: QuestionRepository) {}

  async execute(command: BulkDeleteQuestionCommand) {
    const { deleteQuestionsInput } = command;

    await this.repository.bulkDelete(deleteQuestionsInput.ids);
  }
}
