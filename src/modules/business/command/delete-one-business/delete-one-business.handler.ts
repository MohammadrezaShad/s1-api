import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteOneBusinessCommand } from '@/modules/business/command/delete-one-business/delete-one-business.command';

import { BusinessRepository } from '../../business.repository';

@CommandHandler(DeleteOneBusinessCommand)
export class DeleteOneBusinessHandler
  implements ICommandHandler<DeleteOneBusinessCommand>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute(command: DeleteOneBusinessCommand) {
    const { deleteBusinessInput } = command;
    await this.businessRepository.deleteOne(deleteBusinessInput);
  }
}
