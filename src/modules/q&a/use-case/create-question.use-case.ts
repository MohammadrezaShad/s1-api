import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  CreateQuestionInput,
  CreateQuestionOutput,
} from '../dto/create-question.dto';
import { CreateQuestionCommand } from '../command/create-question/create-question.command';

@Injectable()
export class CreateQuestionUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createQuestion(
    input: CreateQuestionInput,
  ): Promise<CreateQuestionOutput> {
    try {
      await this.commandBus.execute(new CreateQuestionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
