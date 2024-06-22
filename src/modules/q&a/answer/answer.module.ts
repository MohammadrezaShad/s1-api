import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswerRepository } from './answer.repository';
import { AnswerCommandHandlers } from './command';
import { AnswerEntity, AnswerEntitySchema } from './entity/answer.entity';
import { AnswerEntityFactory } from './entity/answer.factory';
import { AnswerHelepr } from './helper/answer-helper';
import { AnswerModelFactory } from './model/answer-model.factory';
import { AnswerQueryHandlers } from './query';
import { AnswerUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: AnswerEntity.name, schema: AnswerEntitySchema },
    ]),
  ],
  providers: [
    ...AnswerCommandHandlers,
    ...AnswerQueryHandlers,
    ...AnswerUseCases,
    AnswerRepository,
    AnswerEntityFactory,
    AnswerModelFactory,
    AnswerHelepr,
  ],
  exports: [...AnswerUseCases],
})
@Global()
export class AnswerModule {}
