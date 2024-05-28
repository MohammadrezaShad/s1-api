import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FAVORITE_NOT_FOUND } from '@/modules/favorite/constant/error-message.constant';
import {
  FindFavoritesInput,
  FindFavoritesOutput,
} from '@/modules/favorite/dto/find-favorite.dto';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';
import { FindFavoriteByIdsQuery } from '@/modules/favorite/query/find-favorite-by-ids/find-favorite-by-ids.query';

import { FavoriteEntityFactory } from '../entity/favorite.factory';

@Injectable()
export class FindFavoriteByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly favoriteEntityFactory: FavoriteEntityFactory,
  ) {}

  async findFavIds({ ids }: FindFavoritesInput): Promise<FindFavoritesOutput> {
    try {
      const favorites: FavoriteModel[] = await this.queryBus.execute(
        new FindFavoriteByIdsQuery(ids),
      );
      if (!favorites) {
        throw new NotFoundException(FAVORITE_NOT_FOUND);
      }

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
