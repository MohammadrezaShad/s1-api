import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AnswerEntity } from '@/modules/q&a/answer/entity/answer.entity';

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
    private readonly helepr: AnswerHelepr,
  ) {}

  async deleteAnswer(input: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
    try {
      await this.helepr.validateAnswerId(input.id);
      const answer: AnswerEntity = await this.commandBus.execute(
        new DeleteAnswerCommand(input),
      );

      await this.helepr.updateQuestion(answer.question, answer._id.toString());

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
