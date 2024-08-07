import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '@/modules/user/command';
import { UserEntity, UserSchema } from '@/modules/user/entity/user.entity';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { EventHandlers } from '@/modules/user/event';
import { UserModelFactory } from '@/modules/user/model/user-model.factory';
import { QueryHandlers } from '@/modules/user/query';
import { UseCases } from '@/modules/user/use-case';
import UserDataLoader from '@/modules/user/user.loader';
import { UserRepository } from '@/modules/user/user.repository';
import { UserResolvers } from '@/modules/user/user.resolver';
import { ImageModule } from '../image/image.module';
import ImageLoader from '../image/image.loader';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    ImageModule,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...UseCases,
    ...UserResolvers,
    ...EventHandlers,
    UserRepository,
    UserEntityFactory,
    UserModelFactory,
    UserDataLoader,
    ImageLoader,
  ],
  exports: [...UseCases],
})
@Global()
export class UserModule {}
