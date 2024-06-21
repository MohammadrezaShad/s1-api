import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionCommandHandlers } from './command';
import { QuestionEntityFactory } from './entity/question.factory';
import { QuestionHelepr } from './helper/question-helper';
import { QuestionModelFactory } from './model/question-model.factory';
import { QuestionQueryHandlers } from './query';
import { QuestionRepository } from './question.repository';
import { QuestionUseCases } from './use-case';
import { QuestionEntity, QuestionEntitySchema } from './entity/question.entity';
import { QuestionResolvers } from './question.resolver';
import QuestionDataLoader from './question.loader';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: QuestionEntity.name, schema: QuestionEntitySchema },
    ]),
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
