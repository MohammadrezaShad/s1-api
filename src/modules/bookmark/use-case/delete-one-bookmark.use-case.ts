import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  DeleteBookmarkOutput,
  DeleteOneBookmarkInput,
} from '../dto/delete-bookmark.dto';
import { DeleteّOneBookmarkCommand } from '../command/delete-one-bookmark/delete-one-bookmark.command';

@Injectable()
export class DeleteOneBookmarkUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async deleteOneBookmark(
    input: DeleteOneBookmarkInput,
  ): Promise<DeleteBookmarkOutput> {
    try {
      await this.commandBus.execute(new DeleteّOneBookmarkCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
