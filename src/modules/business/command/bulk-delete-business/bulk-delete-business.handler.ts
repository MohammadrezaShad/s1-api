import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BulkDeleteBusinessCommand } from './bulk-delete-business.command';
import { BusinessRepository } from '../../business.repository';

@CommandHandler(BulkDeleteBusinessCommand)
export class BulkDeleteBusinessHandler
  implements ICommandHandler<BulkDeleteBusinessCommand>
{
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute(command: BulkDeleteBusinessCommand) {
    const { bulkDeleteBusinessInput } = command;

    await this.businessRepository.bulkDelete(bulkDeleteBusinessInput.ids);
  }
}
