import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindQuestionsInput,
  FindQuestionsOutput,
} from '../dto/find-question.dto';
import { QuestionEntityFactory } from '../entity/question.factory';
import { QuestionModel } from '../model/question.model';
import { FindQuestionByIdsQuery } from '../query/find-question-by-ids/find-question-by-ids.query';

@Injectable()
export class FindQuestionByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly entityFactory: QuestionEntityFactory,
  ) {}

  async findQuestionByIds({
    ids,
  }: FindQuestionsInput): Promise<FindQuestionsOutput> {
    try {
      const questions: QuestionModel[] = await this.queryBus.execute(
        new FindQuestionByIdsQuery(ids),
      );

      const resultList = questions.map(model =>
        this.entityFactory.create(model),
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
