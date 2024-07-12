import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteOneFavoriteCommand } from '@/modules/favorite/command/delete-one-favorite/delete-one-favorite.command';

import { FavoriteRepository } from '../../favorite.repository';

@CommandHandler(DeleteOneFavoriteCommand)
export class DeleteOneFavoriteHandler
  implements ICommandHandler<DeleteOneFavoriteCommand>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute(command: DeleteOneFavoriteCommand) {
    const { deleteOneFavoriteInput } = command;
    await this.favoriteRepository.deleteOne(
      deleteOneFavoriteInput.postId,
      deleteOneFavoriteInput.user,
    );
  }
}
