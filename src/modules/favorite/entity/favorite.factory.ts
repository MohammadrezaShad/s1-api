import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { FavoriteModel } from '@/modules/favorite/model/favorite.model';

import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteEntityFactory
  implements ModelEntityFactory<FavoriteEntity, FavoriteModel>
{
  create(fav: FavoriteModel): FavoriteEntity | null {
    if (!fav) return null;
    return {
      _id: new ObjectId(fav.getId()),
      post: fav.getPost(),
      user: fav.getUser(),
      type: fav.getType(),
    };
  }

  createFromEntity(favEntity: FavoriteEntity): FavoriteModel | null {
    if (!favEntity) return null;
    const { _id, post, user, type } = favEntity;
    return new FavoriteModel(_id.toHexString(), post, user, type);
  }
}
