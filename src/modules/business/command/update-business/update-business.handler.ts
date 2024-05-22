import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBusinessCommand } from './update-business.command';
import { BusinessRepository } from '../../business.repository';

@CommandHandler(UpdateBusinessCommand)
export class UpdateBusinessHandler
  implements ICommandHandler<UpdateBusinessCommand>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute(command: UpdateBusinessCommand) {
    const { updatebusinessInput } = command;
    await this.businessRepository.update(updatebusinessInput);
  }
}
