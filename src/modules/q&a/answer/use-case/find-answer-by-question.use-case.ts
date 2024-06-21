import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindReviewByPostQuery } from '@/modules/review/query/find-review-by-post/find-review-by-post.query';

import {
  FindManyAnswerByQuestionInput,
  FindManyAnswerOutput,
} from '../dto/find-answer.dto';
import { AnswerEntityFactory } from '../entity/answer.factory';
import { AnswerModel } from '../model/answer.model';

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
        new FindReviewByPostQuery(question),
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
