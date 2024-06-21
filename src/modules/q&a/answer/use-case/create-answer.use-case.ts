import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  CreateAnswerInput,
  CreateAnswerOutput,
} from '../dto/create-answer.dto';
import { CreateAnswerCommand } from '../command/create-answer/create-answer.command';

@Injectable()
export class CreateAnswerUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createAnswer(input: CreateAnswerInput): Promise<CreateAnswerOutput> {
    try {
      await this.commandBus.execute(new CreateAnswerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
