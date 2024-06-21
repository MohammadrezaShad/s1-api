import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  DeleteQuestionsInput,
  DeleteQuestionOutput,
} from '../dto/delete-question.dto';
import { QuestionHelepr } from '../helper/question-helper';
import { BulkDeleteQuestionCommand } from '../command/bulk-delete-question/bulk-delete-question.command';

@Injectable()
export class BulkDeleteQuestionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helepr: QuestionHelepr,
  ) {}

  async bulkDeleteQuestion(
    input: DeleteQuestionsInput,
  ): Promise<DeleteQuestionOutput> {
    try {
      for (const id of input.ids) {
        await this.helepr.validateReviewId(id);
      }
      await this.commandBus.execute(new BulkDeleteQuestionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
