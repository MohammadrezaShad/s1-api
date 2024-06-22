import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateQuestionUseCase } from '@/modules/q&a/use-case/update-question.use-case';

import { DeleteAnswerCommand } from '../command/delete-answer/delete-answer.command';
import {
  DeleteAnswerInput,
  DeleteAnswerOutput,
} from '../dto/delete-answer.dto';
import { AnswerHelepr } from '../helper/answer-helper';

@Injectable()
export class DeleteAnswerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: AnswerHelepr,
    private readonly updateQuestionUseCase: UpdateQuestionUseCase,
  ) {}

  async deleteAnswer(input: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
    try {
      await this.reviewHelepr.validateAnswerId(input.id);
      await this.commandBus.execute(new DeleteAnswerCommand(input));

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
