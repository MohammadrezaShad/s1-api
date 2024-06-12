import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

import { ReviewModel } from '../model/review.model';

@Injectable()
export class ReviewEntityFactory
  implements ModelEntityFactory<ReviewEntity, ReviewModel>
{
  create(review: ReviewModel): ReviewEntity | null {
    if (!review) return null;
    return {
      _id: new ObjectId(review.getId()),
      content: review.getContent(),
      post: review.getPost(),
      type: review.getType(),
      authorEmail: review.getAuthorEmail(),
      author: review.getAuthor(),
      createUser: review.getCreateUser(),
      parent: review.getParent(),
      score: review.getScore(),
      approved: review.getApproved(),
    };
  }

  createFromEntity(reviewEntity: ReviewEntity): ReviewModel | null {
    if (!reviewEntity) return null;
    const {
      _id,
      content,
      post,
      type,
      authorEmail,
      author,
      createUser,
      parent,
      score,
      approved,
    } = reviewEntity;
    return new ReviewModel(
      _id.toHexString(),
      content,
      post,
      type,
      authorEmail,
      author,
      createUser,
      parent,
      score,
      approved,
    );
  }
}
