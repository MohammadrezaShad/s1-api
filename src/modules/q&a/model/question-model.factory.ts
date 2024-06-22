import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { CreateQuestionInput } from '../dto/create-question.dto';
import { QuestionRepository } from '../question.repository';
import { QuestionModel } from './question.model';

@Injectable()
export class QuestionModelFactory implements ModelFactory<QuestionModel> {
  constructor(private readonly repository: QuestionRepository) {}

  async create({
    content,
    business,
    user,
  }: CreateQuestionInput): Promise<QuestionModel> {
    const review = new QuestionModel(
      new ObjectId().toHexString(),
      content,
      business,
      user,
    );
    await this.repository.createQuestion(review);
    return review;
  }
}
