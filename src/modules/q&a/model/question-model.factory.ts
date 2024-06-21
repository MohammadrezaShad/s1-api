import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { QuestionModel } from './question.model';
import { QuestionRepository } from '../question.repository';
import { CreateQuestionInput } from '../dto/create-question.dto';

@Injectable()
export class QuestionModelFactory implements ModelFactory<QuestionModel> {
  constructor(private readonly repository: QuestionRepository) {}

  async create({
    content,
    post,
    user,
  }: CreateQuestionInput): Promise<QuestionModel> {
    const review = new QuestionModel(
      new ObjectId().toHexString(),
      content,
      post,
      user,
    );
    await this.repository.createQuestion(review);
    return review;
  }
}
