import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  DeleteQuestionInput,
  DeleteQuestionOutput,
} from '../dto/delete-question.dto';
import { QuestionHelepr } from '../helper/question-helper';
import { DeleteQuestionCommand } from '../command/delete-question/delete-question.command';

@Injectable()
export class DeleteQuestionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helepr: QuestionHelepr,
  ) {}

  async deleteQuestion(
    input: DeleteQuestionInput,
  ): Promise<DeleteQuestionOutput> {
    try {
      await this.helepr.validateReviewId(input.id);
      await this.commandBus.execute(new DeleteQuestionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
