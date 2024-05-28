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
import { FavoriteHelepr } from '@/modules/favorite/helper/favorite-helper';
import { FavoriteModelFactory } from '@/modules/favorite/model/favorite-model.factory';
import { FavoriteQueryHandlers } from '@/modules/favorite/query';
import { FavoriteUseCases } from '@/modules/favorite/use-case';

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
  ],
  exports: [...FavoriteUseCases],
})
@Global()
export class FavoriteModule {}
