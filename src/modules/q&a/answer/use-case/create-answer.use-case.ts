import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AnswerModel } from '@/modules/q&a/answer/model/answer.model';

import { CreateAnswerCommand } from '../command/create-answer/create-answer.command';
import {
  CreateAnswerInput,
  CreateAnswerOutput,
} from '../dto/create-answer.dto';

@Injectable()
export class CreateAnswerUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createAnswer(input: CreateAnswerInput): Promise<CreateAnswerOutput> {
    try {
      const answerId: string = await this.commandBus.execute(
        new CreateAnswerCommand(input),
      );
      return { success: true, answerId: answerId };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
