import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  DeleteBookmarkOutput,
  DeleteBookmarksInput,
} from '../dto/delete-bookmark.dto';
import { BulkDeleteBookmarkCommand } from '../command/bulk-delete-bookmark/bulk-delete-bookmark.command';

@Injectable()
export class BulkDeleteBookmarkUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async bulkDeleteBookmark(
    input: DeleteBookmarksInput,
  ): Promise<DeleteBookmarkOutput> {
    try {
      // for (const id of input.ids) {
      //   //...
      // }
      await this.commandBus.execute(new BulkDeleteBookmarkCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
