import { AggregateRoot } from '@nestjs/cqrs';

import { CollectionName } from '@/common/enums/collection-name.enum';

export class FavoriteModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly post: string,
    private readonly user: string,
    private readonly type: CollectionName,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getPost(): string {
    return this.post;
  }

  getUser(): string {
    return this.user;
  }

  getType(): CollectionName {
    return this.type;
  }
}
