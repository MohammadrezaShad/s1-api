import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from '../dto/create-bookmark.dto';
import { FindRepeatedBookmarkQuery } from '../query/check-repeated-bookmark-by-user/check-repeated-bookmark-by-user.query';
import { BOOKMARK_IS_REPEATED } from '../constant/error-message.constant';
import { CreateBookmarkCommand } from '../command/create-bookmark/create-bookmark.command';

@Injectable()
export class CreateBookmarkUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createBookmark(
    input: CreateBookmarkInput,
  ): Promise<CreateBookmarkOutput> {
    try {
      const isRepeated: boolean = await this.queryBus.execute(
        new FindRepeatedBookmarkQuery({
          post: input.post,
          user: input.user,
          type: input.type,
        }),
      );
      if (isRepeated) {
        throw new InternalServerErrorException(BOOKMARK_IS_REPEATED);
      }
      await this.commandBus.execute(new CreateBookmarkCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
