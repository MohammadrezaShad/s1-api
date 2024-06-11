import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindFavoritesOutput } from '@/modules/favorite/dto/find-favorite.dto';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';

import { FavoriteEntityFactory } from '../entity/favorite.factory';
import { FindFavoriteByPostQuery } from '../query/find-favorite-by-post/find-favorite-by-post.query';

@Injectable()
export class FindFavoriteByPostUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly favoriteEntityFactory: FavoriteEntityFactory,
  ) {}

  async findFavByPost(post: string): Promise<FindFavoritesOutput> {
    try {
      const favorites: FavoriteModel[] = await this.queryBus.execute(
        new FindFavoriteByPostQuery(post),
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
