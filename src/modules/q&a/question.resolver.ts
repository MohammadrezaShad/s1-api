import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { PostOutput } from '@/common/dtos/post-output.dto';
import { Permission } from '@/common/permissions/permission-type';
import {
  CreateAnswerInput,
  CreateAnswerOutput,
} from '@/modules/q&a/answer/dto/create-answer.dto';
import { CreateAnswerUseCase } from '@/modules/q&a/answer/use-case/create-answer.use-case';
import { CreateAnswerFromQuestionUseCase } from '@/modules/q&a/use-case/create-answer.use-case';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { PanelGuard } from '../auth/guards/panel.guard';
import { UserOutput } from '../user/dto/user.output';
import { UserEntity } from '../user/entity/user.entity';
import { FindUserByIdUseCase } from '../user/use-case/find-user-by-id.use-case';
import {
  CreateQuestionInput,
  CreateQuestionOutput,
} from './dto/create-question.dto';
import {
  DeleteQuestionInput,
  DeleteQuestionOutput,
  DeleteQuestionsInput,
} from './dto/delete-question.dto';
import {
  FindQuestionInput,
  FindQuestionOutput,
  FindQuestionsByPostInput,
  FindQuestionsInput,
  FindQuestionsOutput,
} from './dto/find-question.dto';
import { MutateQuestionResponse, QuestionQuery } from './dto/question.dto';
import {
  SearchQuestionInput,
  SearchQuestionOutput,
} from './dto/search-question.dto';
import {
  UpdateQuestionInput,
  UpdateQuestionOutput,
} from './dto/update-question.dto';
import { QuestionEntity } from './entity/question.entity';
import QuestionDataLoader from './question.loader';
import { BulkDeleteQuestionUseCase } from './use-case/bulk-delete-question.use-case';
import { CreateQuestionUseCase } from './use-case/create-question.use-case';
import { DeleteQuestionUseCase } from './use-case/delete-question.use-case';
import { FindQuestionByIdUseCase } from './use-case/find-question-by-id.use-case';
import { FindQuestionByIdsUseCase } from './use-case/find-question-by-ids.use-case';
import { FindQuestionByPostUseCase } from './use-case/find-question-by-post.use-case';
import { SearchQuestionUseCase } from './use-case/search-question.use-case';
import { UpdateQuestionUseCase } from './use-case/update-question.use-case';

@Resolver(() => QuestionQuery)
export class QuestionQueryResolver {
  constructor(
    private readonly searchQuestionUseCase: SearchQuestionUseCase,
    private readonly findQuestionByIdUseCase: FindQuestionByIdUseCase,
    private readonly findQuestionByPostUseCase: FindQuestionByPostUseCase,
    private readonly findQuestionByIdsUseCase: FindQuestionByIdsUseCase,
  ) {}

  @Query(() => QuestionQuery)
  async question() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindQuestionOutput)
  async findQuestionById(
    @Args('input') input: FindQuestionInput,
  ): Promise<FindQuestionOutput> {
    return this.findQuestionByIdUseCase.findQuestionById(input);
  }

  @ResolveField(() => FindQuestionsOutput)
  async findQuestionByPost(
    @Args('input') input: FindQuestionsByPostInput,
  ): Promise<FindQuestionsOutput> {
    return this.findQuestionByPostUseCase.findQuestionsByPost(input);
  }

  @ResolveField(() => FindQuestionsOutput)
  async findQuestionByIds(
    @Args('input') input: FindQuestionsInput,
  ): Promise<FindQuestionsOutput> {
    return this.findQuestionByIdsUseCase.findQuestionByIds(input);
  }

  @ResolveField(() => SearchQuestionOutput)
  async searchQuestion(
    @Args('input') input: SearchQuestionInput,
  ): Promise<SearchQuestionOutput> {
    return this.searchQuestionUseCase.search(input);
  }
}

@Resolver(() => MutateQuestionResponse)
export class QuestionMutationResolver {
  constructor(
    private readonly createQuestionUseCase: CreateQuestionUseCase,
    private readonly createAnswerFromQuestionUseCase: CreateAnswerFromQuestionUseCase,
    private readonly updateQuestionUseCase: UpdateQuestionUseCase,
    private readonly deleteQuestionUseCase: DeleteQuestionUseCase,
    private readonly bulkDeleteQuestionUseCase: BulkDeleteQuestionUseCase,
  ) {}

  @Mutation(() => MutateQuestionResponse)
  async question() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateQuestionOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER, Permission.CREATE)
  async createQuestion(
    @Args('input') input: CreateQuestionInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateQuestionOutput> {
    return this.createQuestionUseCase.createQuestion({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => CreateAnswerOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER, Permission.CREATE)
  async createAnswer(
    @Args('input') input: CreateAnswerInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateAnswerOutput> {
    return this.createAnswerFromQuestionUseCase.createAnswer({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => UpdateQuestionOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_QUESTION, Permission.UPDATE)
  async updateQuestion(
    @Args('input') input: UpdateQuestionInput,
  ): Promise<UpdateQuestionOutput> {
    return this.updateQuestionUseCase.updateQuestion(input);
  }

  @ResolveField(() => DeleteQuestionOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_QUESTION, Permission.DELETE)
  async deleteQuestion(
    @Args('input') input: DeleteQuestionInput,
  ): Promise<DeleteQuestionOutput> {
    return this.deleteQuestionUseCase.deleteQuestion(input);
  }

  @ResolveField(() => DeleteQuestionOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_QUESTION,
    Permission.BULK_DELETE,
  )
  async bulkDeleteQuestion(
    @Args('input') input: DeleteQuestionsInput,
  ): Promise<DeleteQuestionOutput> {
    return this.bulkDeleteQuestionUseCase.bulkDeleteQuestion(input);
  }
}

@Resolver(() => QuestionEntity)
export class QuestionResolver {
  constructor(
    private readonly loader: QuestionDataLoader,
    private readonly userUseCase: FindUserByIdUseCase,
  ) {}

  @ResolveField(() => UserOutput, { name: 'createUser', nullable: true })
  async createUser(@Parent() question: QuestionEntity) {
    const userId = question.user;
    if (userId == null) {
      return null;
    }
    const user = await this.userUseCase.findUserById({ id: userId });
    return user.result;
  }

  @ResolveField(() => PostOutput, { name: 'post', nullable: true })
  async post(@Parent() question: QuestionEntity) {
    const postId = question.post;
    if (postId == null) return null;
    return {
      businessEntity: await this.loader.batchBusiness.load(postId),
    };
  }
}

export const QuestionResolvers = [
  QuestionQueryResolver,
  QuestionMutationResolver,
  QuestionResolver,
];
