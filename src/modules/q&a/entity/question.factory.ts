import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';

import { QuestionModel } from '../model/question.model';
import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionEntityFactory
  implements ModelEntityFactory<QuestionEntity, QuestionModel>
{
  create(model: QuestionModel): QuestionEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      content: model.getContent(),
      post: model.getPost(),
      user: model.getUser(),
      answers: model.getAnswers(),
      approved: model.getApproved(),
    };
  }

  createFromEntity(entity: QuestionEntity): QuestionModel | null {
    if (!entity) return null;
    const { _id, content, post, user, answers, approved } = entity;
    return new QuestionModel(
      _id.toHexString(),
      content,
      post,
      user,
      answers,
      approved,
    );
  }
}
