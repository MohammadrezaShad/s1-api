import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AnswerEntity } from '@/modules/q&a/answer/entity/answer.entity';
import { QuestionEntity } from '@/modules/q&a/entity/question.entity';
import { FindQuestionByIdUseCase } from '@/modules/q&a/use-case/find-question-by-id.use-case';
import { UserOutput } from '@/modules/user/dto/user.output';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';

@Resolver(() => AnswerEntity)
export class AnswerResolver {
  constructor(
    private readonly userUseCase: FindUserByIdUseCase,
    private readonly findQuestionByIdUseCase: FindQuestionByIdUseCase,
  ) {}

  @ResolveField(() => UserOutput, { name: 'user', nullable: true })
  async user(@Parent() answer: AnswerEntity) {
    const userId = answer.user;
    if (userId == null) {
      return null;
    }
    const user = await this.userUseCase.findUserById({ id: userId });
    return user.result;
  }

  @ResolveField(() => [QuestionEntity], { name: 'question', nullable: true })
  async question(@Parent() answer: AnswerEntity) {
    const questionId = answer.question;
    const question = await this.findQuestionByIdUseCase.findQuestionById({
      id: questionId,
    });
    if (!question.result) return [];
    return question.result;
  }
}
