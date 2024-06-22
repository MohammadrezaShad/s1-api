import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AnswerEntity } from '@/modules/q&a/answer/entity/answer.entity';

import { AnswerRepository } from '../../answer.repository';
import { DeleteAnswerCommand } from './delete-answer.command';

@CommandHandler(DeleteAnswerCommand)
export class DeleteAnswerHandler
  implements ICommandHandler<DeleteAnswerCommand>
{
  constructor(private readonly repository: AnswerRepository) {}

  async execute(command: DeleteAnswerCommand): Promise<AnswerEntity | null> {
    const { deleteAnswerInput } = command;
    const answer = await this.repository.delete(deleteAnswerInput.id);
    return answer;
  }
}
