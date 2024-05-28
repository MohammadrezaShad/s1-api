import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteModel } from '@/modules/favorite/model/favorite.model';
import { FindFavoriteByIdQuery } from '@/modules/favorite/query/find-favorite-by-id/find-favorite-by-id.query';

import { FavoriteRepository } from '../../favorite.repository';

@QueryHandler(FindFavoriteByIdQuery)
export class FindFavoritebyIdHandler
  implements IQueryHandler<FindFavoriteByIdQuery>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute({ id }: FindFavoriteByIdQuery): Promise<FavoriteModel | null> {
    return this.favoriteRepository.findById(id);
  }
}
