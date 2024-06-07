import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { DeleteّBookmarkCommand } from './delete-bookmark.command';

@CommandHandler(DeleteّBookmarkCommand)
export class DeleteBookmarkHandler
  implements ICommandHandler<DeleteّBookmarkCommand>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(command: DeleteّBookmarkCommand) {
    const { deleteBookmarkInput } = command;
    await this.bookmarkRepository.delete(deleteBookmarkInput.id);
  }
}
