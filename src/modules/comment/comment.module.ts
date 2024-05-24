import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { CommentEntityFactory } from './entity/comment.factory';
import { CommentModelFactory } from './model/comment-model.factory';
import { CommentEntity, CommentEntitySchema } from './entity/comment.entity';
import { CommentCommandHandlers } from './command';
import { CommentQueryHandlers } from './query';
import { CommentUseCases } from './use-case';
import { CommentResolvers } from './comment.resolver';
import { CommentRepository } from './comment.repository';
import CommentDataLoader from './comment.loader';
import { CommentHelepr } from './helper/business-helper';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: CommentEntity.name, schema: CommentEntitySchema },
    ]),
  ],
  providers: [
    ...CommentCommandHandlers,
    ...CommentQueryHandlers,
    ...CommentUseCases,
    ...CommentResolvers,
    CommentRepository,
    CommentEntityFactory,
    CommentModelFactory,
    CommentHelepr,
    CommentDataLoader,
  ],
  exports: [],
})
@Global()
export class CommentModule {}
