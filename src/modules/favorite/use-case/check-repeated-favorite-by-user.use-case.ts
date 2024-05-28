import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindRepeatedFavoriteInput } from '@/modules/favorite/dto/find-favorite.dto';
import { FindRepeatedFavoriteQuery } from '@/modules/favorite/query/check-repeated-favorite-by-user/check-repeated-favorite-by-user.query';

@Injectable()
export class CheckRepeatedFavoriteByUserUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async checkRepeatedFavoriteByUser(
    findRepeatedFavoriteInput: FindRepeatedFavoriteInput,
  ): Promise<boolean> {
    try {
      const isRepeated: boolean = await this.queryBus.execute(
        new FindRepeatedFavoriteQuery(findRepeatedFavoriteInput),
      );
      return isRepeated;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
