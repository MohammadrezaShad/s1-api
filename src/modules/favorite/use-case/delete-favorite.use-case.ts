import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteّFavoriteCommand } from '@/modules/favorite/command/delete-favorite/delete-favorite.command';
import {
  DeleteFavoriteInput,
  DeleteFavoriteOutput,
} from '@/modules/favorite/dto/delete-favorite.dto';

import { FavoriteHelepr } from '../helper/favorite-helper';

@Injectable()
export class DeleteFavoriteUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly favoriteHelepr: FavoriteHelepr,
  ) {}

  async deleteFav(input: DeleteFavoriteInput): Promise<DeleteFavoriteOutput> {
    try {
      await this.commandBus.execute(new DeleteّFavoriteCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
