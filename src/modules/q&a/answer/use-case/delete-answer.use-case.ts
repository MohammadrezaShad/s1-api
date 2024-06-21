import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  DeleteAnswerInput,
  DeleteAnswerOutput,
} from '../dto/delete-answer.dto';
import { AnswerHelepr } from '../helper/answer-helper';
import { DeleteAnswerCommand } from '../command/delete-answer/delete-answer.command';

@Injectable()
export class DeleteAnswerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reviewHelepr: AnswerHelepr,
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
