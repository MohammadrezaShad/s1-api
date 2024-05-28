import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateFavoriteCommand } from '@/modules/favorite/command/create-favorite/create-favorite.command';

import { FavoriteModelFactory } from '../../model/favorite-model.factory';

@CommandHandler(CreateFavoriteCommand)
export class CreateFavoriteHandler
  implements ICommandHandler<CreateFavoriteCommand>
{
  constructor(private readonly favModelFactory: FavoriteModelFactory) {}

  async execute(command: CreateFavoriteCommand) {
    const { createFavoriteInput } = command;

    await this.favModelFactory.create(createFavoriteInput);
  }
}
