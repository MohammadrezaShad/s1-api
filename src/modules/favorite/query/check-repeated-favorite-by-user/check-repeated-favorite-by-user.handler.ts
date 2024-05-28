import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindRepeatedFavoriteQuery } from '@/modules/favorite/query/check-repeated-favorite-by-user/check-repeated-favorite-by-user.query';

import { FavoriteRepository } from '../../favorite.repository';

@QueryHandler(FindRepeatedFavoriteQuery)
export class CheckRepeatedFavoriteByUserHandler
  implements IQueryHandler<FindRepeatedFavoriteQuery>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute({
    findRepeatedFavoriteInput,
  }: FindRepeatedFavoriteQuery): Promise<boolean> {
    return this.favoriteRepository.checkRepeatedFavoriteByUser(
      findRepeatedFavoriteInput,
    );
  }
}
