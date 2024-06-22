import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindQuestionsByBusinessInput,
  FindQuestionsOutput,
} from '../dto/find-question.dto';
import { QuestionEntityFactory } from '../entity/question.factory';
import { QuestionModel } from '../model/question.model';
import { FindQuestionByBusinessQuery } from '../query/find-question-by-business/find-question-by-business.query';

@Injectable()
export class FindQuestionByBusinessUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly entityFactory: QuestionEntityFactory,
  ) {}

  async findQuestionsByBusiness({
    business,
  }: FindQuestionsByBusinessInput): Promise<FindQuestionsOutput> {
    try {
      const questions: QuestionModel[] = await this.queryBus.execute(
        new FindQuestionByBusinessQuery(business),
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
