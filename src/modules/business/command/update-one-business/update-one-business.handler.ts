import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateOneBusinessCommand } from '@/modules/business/command/update-one-business/update-one-business.command';

import { BusinessRepository } from '../../business.repository';

@CommandHandler(UpdateOneBusinessCommand)
export class UpdateOneBusinessHandler
  implements ICommandHandler<UpdateOneBusinessCommand>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute(command: UpdateOneBusinessCommand) {
    const { updatebusinessInput } = command;
    await this.businessRepository.updateOne(updatebusinessInput);
  }
}
