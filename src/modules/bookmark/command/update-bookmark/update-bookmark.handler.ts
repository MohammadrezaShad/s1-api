import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookmarkRepository } from '../../bookmark.repository';
import { UpdateBookmarkCommand } from './update-bookmark.command';

@CommandHandler(UpdateBookmarkCommand)
export class UpdateBookmarkHandler
  implements ICommandHandler<UpdateBookmarkCommand>
{
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(command: UpdateBookmarkCommand) {
    const { updateBookmarkInput } = command;
    await this.bookmarkRepository.update(updateBookmarkInput);
  }
}
