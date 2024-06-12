import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentCommandHandlers } from './command';
import CommentDataLoader from './comment.loader';
import { CommentRepository } from './comment.repository';
import { CommentResolvers } from './comment.resolver';
import { CommentEntity, CommentEntitySchema } from './entity/comment.entity';
import { CommentEntityFactory } from './entity/comment.factory';
import { CommentHelepr } from './helper/business-helper';
import { CommentModelFactory } from './model/comment-model.factory';
import { CommentQueryHandlers } from './query';
import { CommentUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
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
  exports: [...CommentUseCases],
})
@Global()
export class CommentModule {}
