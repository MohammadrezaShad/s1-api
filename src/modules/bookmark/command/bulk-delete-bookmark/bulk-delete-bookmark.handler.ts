import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { BulkDeleteBookmarkCommand } from './bulk-delete-bookmark.command';

@CommandHandler(BulkDeleteBookmarkCommand)
export class BulkDeleteBookmarkHandler
  implements ICommandHandler<BulkDeleteBookmarkCommand>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(command: BulkDeleteBookmarkCommand) {
    const { deleteBookmarksInput } = command;

    await this.bookmarkRepository.bulkDelete(deleteBookmarksInput.ids);
  }
}
