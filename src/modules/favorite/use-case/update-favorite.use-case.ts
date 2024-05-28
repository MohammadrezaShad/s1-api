import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateFavoriteCommand } from '@/modules/favorite/command/update-favorite/update-favorite.command';
import {
  UpdateFavoriteInput,
  UpdateFavoriteOutput,
} from '@/modules/favorite/dto/update-favorite.dto';
import { FavoriteHelepr } from '@/modules/favorite/helper/favorite-helper';

@Injectable()
export class UpdateFavoriteUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly favoriteHelepr: FavoriteHelepr,
  ) {}

  async updateFav(input: UpdateFavoriteInput): Promise<UpdateFavoriteOutput> {
    try {
      await this.commandBus.execute(new UpdateFavoriteCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
