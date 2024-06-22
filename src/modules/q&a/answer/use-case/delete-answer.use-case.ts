import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AnswerEntity } from '@/modules/q&a/answer/entity/answer.entity';
import { FindQuestionByIdUseCase } from '@/modules/q&a/use-case/find-question-by-id.use-case';
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
    private readonly findQuestionByIdUseCase: FindQuestionByIdUseCase,
    private readonly updateQuestionUseCase: UpdateQuestionUseCase,
  ) {}

  async deleteAnswer(input: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
    try {
      await this.reviewHelepr.validateAnswerId(input.id);
      const answer: AnswerEntity = await this.commandBus.execute(
        new DeleteAnswerCommand(input),
      );
      const question = await this.findQuestionByIdUseCase.findQuestionById({
        id: answer.question,
      });

      console.log({ answer: answer });
      console.log({ question: question });

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
