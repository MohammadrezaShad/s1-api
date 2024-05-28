import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteّFavoriteCommand } from '@/modules/favorite/command/delete-favorite/delete-favorite.command';

import { FavoriteRepository } from '../../favorite.repository';

@CommandHandler(DeleteّFavoriteCommand)
export class DeleteFavoriteHandler
  implements ICommandHandler<DeleteّFavoriteCommand>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(command: DeleteّFavoriteCommand) {
    const { deleteFavoriteInput } = command;
    await this.favoriteRepository.delete(deleteFavoriteInput.id);
  }
}
