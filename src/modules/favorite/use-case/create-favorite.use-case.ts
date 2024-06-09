import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFavoriteCommand } from '@/modules/favorite/command/create-favorite/create-favorite.command';
import { FAVORITE_IS_REPEATED } from '@/modules/favorite/constant/error-message.constant';
import {
  CreateFavoriteInput,
  CreateFavoriteOutput,
} from '@/modules/favorite/dto/create-favorite.dto';
import { FavoriteHelepr } from '@/modules/favorite/helper/favorite-helper';
import { FindRepeatedFavoriteQuery } from '@/modules/favorite/query/check-repeated-favorite-by-user/check-repeated-favorite-by-user.query';

@Injectable()
export class CreateFavoriteUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly favHelepr: FavoriteHelepr,
  ) {}

  async createFav(input: CreateFavoriteInput): Promise<CreateFavoriteOutput> {
    try {
      const isRepeated: boolean = await this.queryBus.execute(
        new FindRepeatedFavoriteQuery({
          post: input.post,
          user: input.user,
          type: input.type,
        }),
      );
      if (isRepeated) {
        throw new InternalServerErrorException(FAVORITE_IS_REPEATED);
      }
      await this.commandBus.execute(new CreateFavoriteCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
