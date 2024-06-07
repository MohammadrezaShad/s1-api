import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';

import { BookmarkEntity } from './bookmark.entity';
import { BookmarkModel } from '../model/bookmark.model';

@Injectable()
export class BookmarkEntityFactory
  implements ModelEntityFactory<BookmarkEntity, BookmarkModel>
{
  create(model: BookmarkModel): BookmarkEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      post: model.getPost(),
      user: model.getUser(),
      type: model.getType(),
    };
  }

  createFromEntity(entity: BookmarkEntity): BookmarkModel | null {
    if (!entity) return null;
    const { _id, post, user, type } = entity;
    return new BookmarkModel(_id.toHexString(), post, user, type);
  }
}
