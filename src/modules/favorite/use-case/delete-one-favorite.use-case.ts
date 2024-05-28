import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteّOneFavoriteCommand } from '@/modules/favorite/command/delete-one-favorite/delete-one-favorite.command';
import {
  DeleteFavoriteOutput,
  DeleteOneFavoriteInput,
} from '@/modules/favorite/dto/delete-favorite.dto';

import { FavoriteHelepr } from '../helper/favorite-helper';

@Injectable()
export class DeleteOneFavoriteUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly favoriteHelepr: FavoriteHelepr,
  ) {}

  async deleteOneFav(
    input: DeleteOneFavoriteInput,
  ): Promise<DeleteFavoriteOutput> {
    try {
      await this.commandBus.execute(new DeleteّOneFavoriteCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
