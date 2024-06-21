import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';

import { AnswerModel } from '../model/answer.model';
import { AnswerEntity } from './answer.entity';

@Injectable()
export class AnswerEntityFactory
  implements ModelEntityFactory<AnswerEntity, AnswerModel>
{
  create(review: AnswerModel): AnswerEntity | null {
    if (!review) return null;
    return {
      _id: new ObjectId(review.getId()),
      content: review.getContent(),
      question: review.getQuestion(),
      date: review.getDate(),
      user: review.getUser(),
      approved: review.getApproved(),
    };
  }

  createFromEntity(entity: AnswerEntity): AnswerModel | null {
    if (!entity) return null;
    const { _id, content, question, date, user, approved } = entity;
    return new AnswerModel(
      _id.toHexString(),
      content,
      question,
      date,
      user,
      approved,
    );
  }
}
