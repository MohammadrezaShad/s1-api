import { CollectionName } from '@/common/enums/collection-name.enum';

export class FavoriteCountByPostQuery {
  constructor(
    public readonly postId: string,
    public readonly type: CollectionName,
  ) {}
}
