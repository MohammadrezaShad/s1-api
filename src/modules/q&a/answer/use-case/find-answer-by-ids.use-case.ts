import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyAnswerInput,
  FindManyAnswerOutput,
} from '../dto/find-answer.dto';
import { AnswerEntityFactory } from '../entity/answer.factory';
import { AnswerModel } from '../model/answer.model';
import { FindAnswerByIdsQuery } from '../query/find-answer-by-ids/find-answer-by-ids.query';

@Injectable()
export class FindAnswerByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly answerEntityFactory: AnswerEntityFactory,
  ) {}

  async findAnswerByIds({
    ids,
  }: FindManyAnswerInput): Promise<FindManyAnswerOutput> {
    try {
      const answers: AnswerModel[] = await this.queryBus.execute(
        new FindAnswerByIdsQuery(ids),
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
