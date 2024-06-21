import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateQuestionCommand } from '../command/update-question/update-question.command';
import {
  UpdateQuestionInput,
  UpdateQuestionOutput,
} from '../dto/update-question.dto';
import { QuestionHelepr } from '../helper/question-helper';

@Injectable()
export class UpdateQuestionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helepr: QuestionHelepr,
  ) {}

  async updateQuestion(
    input: UpdateQuestionInput,
  ): Promise<UpdateQuestionOutput> {
    try {
      await this.helepr.validateReviewId(input.id);

      await this.commandBus.execute(new UpdateQuestionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
