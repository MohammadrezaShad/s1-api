import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindQuestionsByPostInput,
  FindQuestionsOutput,
} from '../dto/find-question.dto';
import { QuestionEntityFactory } from '../entity/question.factory';
import { QuestionModel } from '../model/question.model';
import { FindQuestionByPostQuery } from '../query/find-question-by-post/find-question-by-post.query';

@Injectable()
export class FindQuestionByPostUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly entityFactory: QuestionEntityFactory,
  ) {}

  async findQuestionsByPost({
    post,
  }: FindQuestionsByPostInput): Promise<FindQuestionsOutput> {
    try {
      const questions: QuestionModel[] = await this.queryBus.execute(
        new FindQuestionByPostQuery(post),
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
