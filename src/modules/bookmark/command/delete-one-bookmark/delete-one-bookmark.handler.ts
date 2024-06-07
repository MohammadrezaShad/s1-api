import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { DeleteّOneBookmarkCommand } from './delete-one-bookmark.command';

@CommandHandler(DeleteّOneBookmarkCommand)
export class DeleteOneBookmarkHandler
  implements ICommandHandler<DeleteّOneBookmarkCommand>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(command: DeleteّOneBookmarkCommand) {
    const { deleteOneBookmarkInput } = command;
    await this.bookmarkRepository.deleteOne(
      deleteOneBookmarkInput.postId,
      deleteOneBookmarkInput.user,
    );
  }
}
