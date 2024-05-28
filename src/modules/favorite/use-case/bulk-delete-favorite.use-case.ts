import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteFavoriteCommand } from '@/modules/favorite/command/bulk-delete-favorite/bulk-delete-favorite.command';
import {
  DeleteFavoriteOutput,
  DeleteFavoritesInput,
} from '@/modules/favorite/dto/delete-favorite.dto';
import { FavoriteHelepr } from '@/modules/favorite/helper/favorite-helper';

@Injectable()
export class BulkDeleteFavoriteUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly favoriteHelepr: FavoriteHelepr,
  ) {}

  async bulkDeleteFav(
    input: DeleteFavoritesInput,
  ): Promise<DeleteFavoriteOutput> {
    try {
      // for (const id of input.ids) {
      //   //...
      // }
      await this.commandBus.execute(new BulkDeleteFavoriteCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
