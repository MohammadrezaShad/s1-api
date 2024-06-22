import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  DeleteManyAnswerInput,
  DeleteAnswerOutput,
} from '../dto/delete-answer.dto';
import { BulkDeleteAnswerCommand } from '../command/bulk-delete-answer/bulk-delete-answer.command';
import { AnswerHelepr } from '../helper/answer-helper';

@Injectable()
export class BulkDeleteAnswerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    // private readonly answerHelepr: AnswerHelepr,
  ) {}

  async bulkDeleteAnswer(
    input: DeleteManyAnswerInput,
  ): Promise<DeleteAnswerOutput> {
    try {
      // for (const id of input.ids) {
      //   await this.helepr.validateAnswerId(id);
      // }
      await this.commandBus.execute(new BulkDeleteAnswerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
