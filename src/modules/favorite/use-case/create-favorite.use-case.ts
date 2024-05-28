import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateFavoriteCommand } from '@/modules/favorite/command/create-favorite/create-favorite.command';
import {
  CreateFavoriteInput,
  CreateFavoriteOutput,
} from '@/modules/favorite/dto/create-favorite.dto';
import { FavoriteHelepr } from '@/modules/favorite/helper/favorite-helper';

@Injectable()
export class CreateFavoriteUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly favHelepr: FavoriteHelepr,
  ) {}

  async createFav(input: CreateFavoriteInput): Promise<CreateFavoriteOutput> {
    try {
      await this.commandBus.execute(new CreateFavoriteCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
