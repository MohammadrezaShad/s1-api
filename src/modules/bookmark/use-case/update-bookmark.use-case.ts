import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UpdateBookmarkInput,
  UpdateBookmarkOutput,
} from '../dto/update-bookmark.dto';
import { UpdateBookmarkCommand } from '../command/update-bookmark/update-bookmark.command';

@Injectable()
export class UpdateBookmarkUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async updateBookmark(
    input: UpdateBookmarkInput,
  ): Promise<UpdateBookmarkOutput> {
    try {
      await this.commandBus.execute(new UpdateBookmarkCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
