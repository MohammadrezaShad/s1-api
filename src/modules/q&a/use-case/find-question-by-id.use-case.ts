import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindQuestionInput,
  FindQuestionOutput,
} from '../dto/find-question.dto';
import { QuestionEntityFactory } from '../entity/question.factory';
import { QuestionModel } from '../model/question.model';
import { FindQuestionByIdQuery } from '../query/find-question-by-id/find-question-by-id.query';
import { QUESTION_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindQuestionByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly entityFactory: QuestionEntityFactory,
  ) {}

  async findQuestionById({
    id,
  }: FindQuestionInput): Promise<FindQuestionOutput> {
    try {
      const question: QuestionModel = await this.queryBus.execute(
        new FindQuestionByIdQuery(id),
      );
      if (!question) {
        throw new NotFoundException(QUESTION_NOT_FOUND);
      }

      return {
        success: true,
        result: this.entityFactory.create(question),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
