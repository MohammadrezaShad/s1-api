import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteModel } from '@/modules/favorite/model/favorite.model';

import { FavoriteRepository } from '../../favorite.repository';
import { FindFavoriteByPostQuery } from './find-favorite-by-post.query';

@QueryHandler(FindFavoriteByPostQuery)
export class FindFavoriteByPostHandler
  implements IQueryHandler<FindFavoriteByPostQuery>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute({ post }: FindFavoriteByPostQuery): Promise<FavoriteModel[]> {
    return this.favoriteRepository.findByPost(post);
  }
}
