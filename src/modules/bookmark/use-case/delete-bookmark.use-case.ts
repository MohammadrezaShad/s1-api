import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  DeleteBookmarkInput,
  DeleteBookmarkOutput,
} from '../dto/delete-bookmark.dto';
import { DeleteّBookmarkCommand } from '../command/delete-bookmark/delete-bookmark.command';

@Injectable()
export class DeleteBookmarkUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async deleteBookmark(
    input: DeleteBookmarkInput,
  ): Promise<DeleteBookmarkOutput> {
    try {
      await this.commandBus.execute(new DeleteّBookmarkCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
