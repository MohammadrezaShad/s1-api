import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ReviewEntity,
  ReviewEntitySchema,
} from '@/modules/review/entity/review.entity';
import { ReviewResolvers } from '@/modules/review/review.resolver';

import { ReviewCommandHandlers } from './command';
import { ReviewEntityFactory } from './entity/review.factory';
import { ReviewHelepr } from './helper/review-helper';
import { ReviewModelFactory } from './model/review-model.factory';
import { ReviewQueryHandlers } from './query';
import ReviewDataLoader from './review.loader';
import { ReviewRepository } from './review.repository';
import { ReviewUseCases } from './use-case';
import { ImageModule } from '../image/image.module';
import ImageLoader from '../image/image.loader';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: ReviewEntity.name, schema: ReviewEntitySchema },
    ]),
    ImageModule,
  ],
  providers: [
    ...ReviewCommandHandlers,
    ...ReviewQueryHandlers,
    ...ReviewUseCases,
    ...ReviewResolvers,
    ReviewRepository,
    ReviewEntityFactory,
    ReviewModelFactory,
    ReviewHelepr,
    ReviewDataLoader,
    ImageLoader,
  ],
  exports: [...ReviewUseCases],
})
@Global()
export class ReviewModule {}
