import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';

import { AnswerRepository } from '../answer.repository';
import { CreateAnswerInput } from '../dto/create-answer.dto';
import { AnswerModel } from './answer.model';

@Injectable()
export class AnswerModelFactory implements ModelFactory<AnswerModel> {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async create({
    content,
    question,
    user,
  }: CreateAnswerInput): Promise<AnswerModel> {
    const answer = new AnswerModel(
      new ObjectId().toHexString(),
      content,
      question,
      user,
    );
    await this.answerRepository.createAnswer(answer);
    return answer;
  }
}
