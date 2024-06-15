import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteRepository } from '@/modules/favorite/favorite.repository';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';
import { GetFavoritesByUserQuery } from '@/modules/favorite/query/get-favorite-by-user/get-favorite-by-user.query';

@QueryHandler(GetFavoritesByUserQuery)
export class GetFavoritesByUserHandler
  implements IQueryHandler<GetFavoritesByUserQuery>
{
  constructor(private readonly repository: FavoriteRepository) {}

  async execute({ user }: GetFavoritesByUserQuery): Promise<FavoriteModel[]> {
    return this.repository.getFavoritesByUser(user);
  }
}
