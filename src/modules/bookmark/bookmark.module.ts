import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkEntity, BookmarkSchema } from './entity/bookmark.entity';
import { BookmarkCommandHandlers } from './command';
import { BookmarkQueryHandlers } from './query';
import { BookmarkUseCases } from './use-case';
import { BookmarkResolvers } from './bookmark.resolver';
import { BookmarkRepository } from './bookmark.repository';
import { BookmarkEntityFactory } from './entity/bookmark.factory';
import { BookmarkModelFactory } from './model/bookmark-model.factory';
import { BookmarkLoader } from './bookmark.loader';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: BookmarkEntity.name, schema: BookmarkSchema },
    ]),
  ],
  providers: [
    ...BookmarkCommandHandlers,
    ...BookmarkQueryHandlers,
    ...BookmarkUseCases,
    ...BookmarkResolvers,
    BookmarkRepository,
    BookmarkEntityFactory,
    BookmarkModelFactory,
    BookmarkLoader,
  ],
  exports: [...BookmarkUseCases],
})
@Global()
export class BookmarkModule {}
