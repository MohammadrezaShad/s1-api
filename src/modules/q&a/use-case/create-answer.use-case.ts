import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  CreateAnswerInput,
  CreateAnswerOutput,
} from '@/modules/q&a/answer/dto/create-answer.dto';
import { CreateAnswerUseCase } from '@/modules/q&a/answer/use-case/create-answer.use-case';
import { FindQuestionByIdUseCase } from '@/modules/q&a/use-case/find-question-by-id.use-case';
import { UpdateQuestionUseCase } from '@/modules/q&a/use-case/update-question.use-case';

@Injectable()
export class CreateAnswerFromQuestionUseCase {
  constructor(
    private readonly createAnswerUseCase: CreateAnswerUseCase,
    private readonly findQuestionByIdUseCase: FindQuestionByIdUseCase,
    private readonly updateQuestionUseCase: UpdateQuestionUseCase,
  ) {}

  async createAnswer(input: CreateAnswerInput): Promise<CreateAnswerOutput> {
    try {
      const question = await this.findQuestionByIdUseCase.findQuestionById({
        id: input.question,
      });
      if (!question.result) return { success: false };

      const answer = await this.createAnswerUseCase.createAnswer({
        ...input,
        question: input.question,
      });

      const answers = question.result.answers;
      answers.push(answer.answerId);
      await this.updateQuestionUseCase.updateQuestion({
        id: input.question,
        answers: answers,
      });
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
