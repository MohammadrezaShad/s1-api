import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FavoriteCountByPostQuery } from '@/modules/favorite/query/fav-count-by-post/favorite-count-by-post.query';

import { FavoriteRepository } from '../../favorite.repository';

@QueryHandler(FavoriteCountByPostQuery)
export class FavoriteCountByPostHandler
  implements IQueryHandler<FavoriteCountByPostQuery>
{
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async execute({ postId }: FavoriteCountByPostQuery): Promise<number> {
    return this.favoriteRepository.countByPost(postId);
  }
}
