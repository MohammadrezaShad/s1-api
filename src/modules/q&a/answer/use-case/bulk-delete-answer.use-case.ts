import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AnswerHelepr } from '../helper/answer-helper';

import {
  DeleteManyAnswerInput,
  DeleteAnswerOutput,
} from '../dto/delete-answer.dto';
import { BulkDeleteAnswerCommand } from '../command/bulk-delete-answer/bulk-delete-answer.command';

@Injectable()
export class BulkDeleteAnswerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    // private readonly helepr: AnswerHelepr,
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
