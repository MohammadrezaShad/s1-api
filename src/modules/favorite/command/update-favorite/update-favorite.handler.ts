import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateFavoriteCommand } from '@/modules/favorite/command/update-favorite/update-favorite.command';

import { FavoriteRepository } from '../../favorite.repository';

@CommandHandler(UpdateFavoriteCommand)
export class UpdateFavoriteHandler
  implements ICommandHandler<UpdateFavoriteCommand>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(command: UpdateFavoriteCommand) {
    const { updateFavoriteInput } = command;
    await this.favoriteRepository.update(updateFavoriteInput);
  }
}
