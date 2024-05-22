import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBusinessCommand } from './delete-business.command';
import { BusinessRepository } from '../../business.repository';

@CommandHandler(DeleteBusinessCommand)
export class DeleteBusinessHandler
  implements ICommandHandler<DeleteBusinessCommand>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute(command: DeleteBusinessCommand) {
    const { deleteBusinessInput } = command;
    await this.businessRepository.delete(deleteBusinessInput);
  }
}
