import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FAVORITE_NOT_FOUND } from '@/modules/favorite/constant/error-message.constant';
import {
  FindFavoriteInput,
  FindFavoriteOutput,
} from '@/modules/favorite/dto/find-favorite.dto';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';
import { FindFavoriteByIdQuery } from '@/modules/favorite/query/find-favorite-by-id/find-favorite-by-id.query';

import { FavoriteEntityFactory } from '../entity/favorite.factory';
@Injectable()
export class FindFavoriteByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly favoriteEntityFactory: FavoriteEntityFactory,
  ) {}

  async findFavById({ id }: FindFavoriteInput): Promise<FindFavoriteOutput> {
    try {
      const fav: FavoriteModel = await this.queryBus.execute(
        new FindFavoriteByIdQuery(id),
      );
      if (!fav) {
        throw new NotFoundException(FAVORITE_NOT_FOUND);
      }

      return {
        success: true,
        result: this.favoriteEntityFactory.create(fav),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
