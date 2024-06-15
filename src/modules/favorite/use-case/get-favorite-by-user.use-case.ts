import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindFavoritesOutput } from '@/modules/favorite/dto/find-favorite.dto';
import { FavoriteEntityFactory } from '@/modules/favorite/entity/favorite.factory';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';
import { GetFavoritesByUserQuery } from '@/modules/favorite/query/get-favorite-by-user/get-favorite-by-user.query';

@Injectable()
export class GetFavoritesByUserUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly favoriteEntityFactory: FavoriteEntityFactory,
  ) {}

  async getFavoritesByUser(user: string): Promise<FindFavoritesOutput> {
    try {
      const favorites: FavoriteModel[] = await this.queryBus.execute(
        new GetFavoritesByUserQuery(user),
      );

      const resultList = favorites.map(model =>
        this.favoriteEntityFactory.create(model),
      );

      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
