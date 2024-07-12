import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FavoriteCountByPostQuery } from '@/modules/favorite/query/fav-count-by-post/favorite-count-by-post.query';
import { CollectionName } from '@/common/enums/collection-name.enum';

@Injectable()
export class FavoriteCountByPostUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async favoriteCountByPost(
    postId: string,
    type: CollectionName,
  ): Promise<number> {
    try {
      const count = await this.queryBus.execute(
        new FavoriteCountByPostQuery(postId, type),
      );

      return count;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
