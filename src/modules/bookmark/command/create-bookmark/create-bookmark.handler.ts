import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookmarkModelFactory } from '../../model/bookmark-model.factory';
import { CreateBookmarkCommand } from './create-bookmark.command';

@CommandHandler(CreateBookmarkCommand)
export class CreateBookmarkHandler
  implements ICommandHandler<CreateBookmarkCommand>
{
  constructor(private readonly modelFactory: BookmarkModelFactory) {}

  async execute(command: CreateBookmarkCommand) {
    const { createBookmarkInput } = command;

    await this.modelFactory.create(createBookmarkInput);
  }
}
