import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindAnswerInput, FindAnswerOutput } from '../dto/find-answer.dto';
import { AnswerEntityFactory } from '../entity/answer.factory';
import { AnswerModel } from '../model/answer.model';
import { FindAnswerByIdQuery } from '../query/find-answer-by-id/find-answer-by-id.query';
import { ANSWER_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindAnswerByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly answerEntityFactory: AnswerEntityFactory,
  ) {}

  async findAnswerById({ id }: FindAnswerInput): Promise<FindAnswerOutput> {
    try {
      const answer: AnswerModel = await this.queryBus.execute(
        new FindAnswerByIdQuery(id),
      );
      if (!answer) {
        throw new NotFoundException(ANSWER_NOT_FOUND);
      }

      return {
        success: true,
        result: this.answerEntityFactory.create(answer),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
