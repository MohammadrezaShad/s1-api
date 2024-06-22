import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswerModule } from '@/modules/q&a/answer/answer.module';

import { QuestionCommandHandlers } from './command';
import { QuestionEntity, QuestionEntitySchema } from './entity/question.entity';
import { QuestionEntityFactory } from './entity/question.factory';
import { QuestionHelepr } from './helper/question-helper';
import { QuestionModelFactory } from './model/question-model.factory';
import { QuestionQueryHandlers } from './query';
import QuestionDataLoader from './question.loader';
import { QuestionRepository } from './question.repository';
import { QuestionResolvers } from './question.resolver';
import { QuestionUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: QuestionEntity.name, schema: QuestionEntitySchema },
    ]),
    AnswerModule,
  ],
  providers: [
    ...QuestionCommandHandlers,
    ...QuestionQueryHandlers,
    ...QuestionUseCases,
    ...QuestionResolvers,
    QuestionRepository,
    QuestionEntityFactory,
    QuestionModelFactory,
    QuestionHelepr,
    QuestionDataLoader,
  ],
  exports: [...QuestionUseCases],
})
@Global()
export class QuestionModule {}
