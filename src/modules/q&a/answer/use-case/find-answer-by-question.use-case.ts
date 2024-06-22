import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyAnswerByQuestionInput,
  FindManyAnswerOutput,
} from '../dto/find-answer.dto';
import { AnswerEntityFactory } from '../entity/answer.factory';
import { AnswerModel } from '../model/answer.model';
import { FindAnswerByQuestionQuery } from '../query/find-answer-by-question/find-answer-by-question.query';

@Injectable()
export class FindAnswerByQuestionUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly answerEntityFactory: AnswerEntityFactory,
  ) {}

  async findAnswerByQuestion({
    question,
  }: FindManyAnswerByQuestionInput): Promise<FindManyAnswerOutput> {
    try {
      const answers: AnswerModel[] = await this.queryBus.execute(
        new FindAnswerByQuestionQuery(question),
      );

      const resultList = answers.map(model =>
        this.answerEntityFactory.create(model),
      );

      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
