import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { AnswerModel } from './answer.model';
import { AnswerRepository } from '../answer.repository';
import { CreateAnswerInput } from '../dto/create-answer.dto';

@Injectable()
export class AnswerModelFactory implements ModelFactory<AnswerModel> {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async create({
    content,
    question,
    date,
    user,
  }: CreateAnswerInput): Promise<AnswerModel> {
    const answer = new AnswerModel(
      new ObjectId().toHexString(),
      content,
      question,
      date,
      user,
    );
    await this.answerRepository.createAnswer(answer);
    return answer;
  }
}
