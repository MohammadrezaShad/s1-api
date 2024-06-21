import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateAnswerCommand } from '../command/update-answer/update-answer.command';
import { AnswerHelepr } from '../helper/answer-helper';
import {
  UpdateAnswerInput,
  UpdateAnswerOutput,
} from '../dto/update-answer.dto';

@Injectable()
export class UpdateAnswerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helepr: AnswerHelepr,
  ) {}

  async updateAnswer(input: UpdateAnswerInput): Promise<UpdateAnswerOutput> {
    try {
      await this.helepr.validateAnswerId(input.id);

      await this.commandBus.execute(new UpdateAnswerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
