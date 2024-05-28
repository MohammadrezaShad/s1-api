import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FavoriteRepository } from '../../favorite.repository';
import { BulkDeleteFavoriteCommand } from './bulk-delete-favorite.command';

@CommandHandler(BulkDeleteFavoriteCommand)
export class BulkDeleteFavoriteHandler
  implements ICommandHandler<BulkDeleteFavoriteCommand>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(command: BulkDeleteFavoriteCommand) {
    const { deleteFavoritesInput } = command;

    await this.favoriteRepository.bulkDelete(deleteFavoritesInput.ids);
  }
}
