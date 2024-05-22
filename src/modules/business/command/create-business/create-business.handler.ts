import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateBusinessCommand } from './create-business.command';
import { BusinessModelFactory } from '../../model/business-model.factory';

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler
  implements ICommandHandler<CreateBusinessCommand>
{
  constructor(private readonly businessFactory: BusinessModelFactory) {}

  async execute(command: CreateBusinessCommand) {
    const { createBusinessInput } = command;

    await this.businessFactory.create(createBusinessInput);
  }
}
