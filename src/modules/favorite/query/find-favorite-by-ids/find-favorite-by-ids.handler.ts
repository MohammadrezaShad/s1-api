import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteModel } from '@/modules/favorite/model/favorite.model';
import { FindFavoriteByIdsQuery } from '@/modules/favorite/query/find-favorite-by-ids/find-favorite-by-ids.query';

import { FavoriteRepository } from '../../favorite.repository';

@QueryHandler(FindFavoriteByIdsQuery)
export class FindFavoritebyIdsHandler
  implements IQueryHandler<FindFavoriteByIdsQuery>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute({ ids }: FindFavoriteByIdsQuery): Promise<FavoriteModel[]> {
    return this.favoriteRepository.findManyById(ids);
  }
}
