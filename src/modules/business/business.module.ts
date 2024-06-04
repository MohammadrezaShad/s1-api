import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { BusinessEntity, BusinessSchema } from './entity/business.entity';
import { BusinessCommandHandlers } from './command';
import { BusinessQueryHandlers } from './query';
import { BusinessUseCases } from './use-case';
import { BusinessResolvers } from './business.resolver';
import { BusinessRepository } from './business.repository';
import { BusinessEntityFactory } from './entity/business.factory';
import { BusinessModelFactory } from './model/business-model.factory';
import { ImageModule } from '../image/image.module';
import { BusinessHelepr } from './helper/business-helper';
import ImageLoader from '../image/image.loader';
import BusinessDataLoader from './business.loader';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: BusinessEntity.name, schema: BusinessSchema },
    ]),
    ImageModule,
  ],
  providers: [
    ...BusinessCommandHandlers,
    ...BusinessQueryHandlers,
    ...BusinessUseCases,
    ...BusinessResolvers,
    BusinessRepository,
    BusinessEntityFactory,
    BusinessModelFactory,
    BusinessHelepr,
    ImageLoader,
    BusinessDataLoader,
  ],
  exports: [...BusinessUseCases],
})
@Global()
export class BusinessModule {}
