import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CommentEntity } from './comment.entity';
import { CommentModel } from '../model/comment.model';
import { ModelEntityFactory } from '@/common/repositories/model-entity';

@Injectable()
export class CommentEntityFactory
  implements ModelEntityFactory<CommentEntity, CommentModel>
{
  create(comment: CommentModel): CommentEntity | null {
    if (!comment) return null;
    return {
      _id: new ObjectId(comment.getId()),
      content: comment.getContent(),
      post: comment.getPost(),
      type: comment.getType(),
      authorEmail: comment.getAuthorEmail(),
      author: comment.getAuthor(),
      createUser: comment.getCreateUser(),
      parent: comment.getParent(),
      approved: comment.getApproved(),
      client: comment.getClient(),
    };
  }

  createFromEntity(commentEntity: CommentEntity): CommentModel | null {
    if (!commentEntity) return null;
    const {
      _id,
      content,
      post,
      type,
      authorEmail,
      author,
      createUser,
      parent,
      client,
      approved,
    } = commentEntity;
    return new CommentModel(
      _id.toHexString(),
      content,
      post,
      type,
      authorEmail,
      author,
      createUser,
      parent,
      client,
      approved,
    );
  }
}
