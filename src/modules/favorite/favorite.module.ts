import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoriteCommandHandlers } from '@/modules/favorite/command';
import {
  FavoriteEntity,
  FavoriteSchema,
} from '@/modules/favorite/entity/favorite.entity';
import { FavoriteEntityFactory } from '@/modules/favorite/entity/favorite.factory';
import { FavoriteRepository } from '@/modules/favorite/favorite.repository';
import { FavoriteResolvers } from '@/modules/favorite/favorite.resolver';
import { FavoriteModelFactory } from '@/modules/favorite/model/favorite-model.factory';
import { FavoriteQueryHandlers } from '@/modules/favorite/query';
import { FavoriteUseCases } from '@/modules/favorite/use-case';
import { FavoriteLoader } from './favorite.loader';
import { FavoriteHelepr } from './helper/favorite-helper';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: FavoriteEntity.name, schema: FavoriteSchema },
    ]),
  ],
  providers: [
    ...FavoriteCommandHandlers,
    ...FavoriteQueryHandlers,
    ...FavoriteUseCases,
    ...FavoriteResolvers,
    FavoriteRepository,
    FavoriteEntityFactory,
    FavoriteModelFactory,
    FavoriteHelepr,
    FavoriteLoader,
  ],
  exports: [...FavoriteUseCases],
})
@Global()
export class FavoriteModule {}
