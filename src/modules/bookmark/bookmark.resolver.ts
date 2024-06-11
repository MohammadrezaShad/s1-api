import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { PostOutput } from '@/common/dtos/post-output.dto';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { Permission } from '@/common/permissions/permission-type';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';
import { UserEntity } from '@/modules/user/entity/user.entity';

import { PanelGuard } from '../auth/guards/panel.guard';
import { UserOutput } from '../user/dto/user.output';
import { FindUserByIdUseCase } from '../user/use-case/find-user-by-id.use-case';
import { BookmarkLoader } from './bookmark.loader';
import { BookmarkResponse, MutateBookmarkResponse } from './dto/bookmark.dto';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dto/create-bookmark.dto';
import {
  DeleteBookmarkInput,
  DeleteBookmarkOutput,
  DeleteBookmarksInput,
  DeleteOneBookmarkInput,
} from './dto/delete-bookmark.dto';
import {
  FindBookmarkInput,
  FindBookmarkOutput,
  FindBookmarksInput,
  FindBookmarksOutput,
} from './dto/find-bookmark.dto';
import {
  SearchBookmarkInput,
  SearchBookmarkOutput,
} from './dto/search-bookmark.dto';
import {
  UpdateBookmarkInput,
  UpdateBookmarkOutput,
} from './dto/update-bookmark.dto';
import { BookmarkEntity } from './entity/bookmark.entity';
import { BulkDeleteBookmarkUseCase } from './use-case/bulk-delete-bookmark.use-case';
import { CreateBookmarkUseCase } from './use-case/create-bookmark.use-case';
import { DeleteBookmarkUseCase } from './use-case/delete-bookmark.use-case';
import { DeleteOneBookmarkUseCase } from './use-case/delete-one-bookmark.use-case';
import { FindBookmarkByIdUseCase } from './use-case/find-bookmark-by-id.use-case';
import { FindBookmarkByIdsUseCase } from './use-case/find-bookmark-by-ids.use-case';
import { SearchBookmarkUseCase } from './use-case/search-bookmark.use-case';
import { UpdateBookmarkUseCase } from './use-case/update-bookmark.use-case';

@Resolver(() => BookmarkResponse)
export class BookmarkQueryResolver {
  constructor(
    private readonly searchBookmarkUseCase: SearchBookmarkUseCase,
    private readonly findBookmarkByIdUseCase: FindBookmarkByIdUseCase,
    private readonly findBookmarkByIdsUseCase: FindBookmarkByIdsUseCase,
  ) {}

  @Query(() => BookmarkResponse)
  async bookmark() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindBookmarkOutput)
  async findBookmarkById(
    @Args('input') input: FindBookmarkInput,
  ): Promise<FindBookmarkOutput> {
    return this.findBookmarkByIdUseCase.findBookmarkById(input);
  }

  @ResolveField(() => FindBookmarksOutput)
  async findBookmarkByIds(
    @Args('input') input: FindBookmarksInput,
  ): Promise<FindBookmarksOutput> {
    return this.findBookmarkByIdsUseCase.findBookmarkByIds(input);
  }

  @ResolveField(() => SearchBookmarkOutput)
  async searchBookmark(
    @Args('input') input: SearchBookmarkInput,
  ): Promise<SearchBookmarkOutput> {
    return this.searchBookmarkUseCase.search(input);
  }
}

@Resolver(() => MutateBookmarkResponse)
export class BookmarkMutationResolver {
  constructor(
    private readonly createBookmarkUseCase: CreateBookmarkUseCase,
    private readonly updateBookmarkUseCase: UpdateBookmarkUseCase,
    private readonly deleteBookmarkUseCase: DeleteBookmarkUseCase,
    private readonly deleteOneBookmarkUseCase: DeleteOneBookmarkUseCase,
    private readonly bulkDeleteBookmarkUseCase: BulkDeleteBookmarkUseCase,
  ) {}

  @Mutation(() => MutateBookmarkResponse)
  async bookmark() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateBookmarkOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async createBookmark(
    @Args('input') input: CreateBookmarkInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateBookmarkOutput> {
    return this.createBookmarkUseCase.createBookmark({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  // @ResolveField(() => UpdateBookmarkOutput)
  // @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  // async updateBookmark(
  //   @Args('input') input: UpdateBookmarkInput,
  // ): Promise<UpdateBookmarkOutput> {
  //   return this.updateBookmarkUseCase.updateBookmark(input);
  // }

  @ResolveField(() => DeleteBookmarkOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_BOOKMARK, Permission.DELETE)
  async deleteBookmark(
    @Args('input') input: DeleteBookmarkInput,
  ): Promise<DeleteBookmarkOutput> {
    return this.deleteBookmarkUseCase.deleteBookmark(input);
  }

  @ResolveField(() => DeleteBookmarkOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async deleteOneBookmark(
    @Args('input') input: DeleteOneBookmarkInput,
    @GetUser() user: UserEntity,
  ): Promise<DeleteBookmarkOutput> {
    return this.deleteOneBookmarkUseCase.deleteOneBookmark({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => DeleteBookmarkOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_BOOKMARK,
    Permission.BULK_DELETE,
  )
  async bulkDeleteBookmark(
    @Args('input') input: DeleteBookmarksInput,
  ): Promise<DeleteBookmarkOutput> {
    return this.bulkDeleteBookmarkUseCase.bulkDeleteBookmark(input);
  }
}

@Resolver(() => BookmarkEntity)
export class BookmarkResolver {
  constructor(
    private readonly userUseCase: FindUserByIdUseCase,
    private readonly loader: BookmarkLoader,
  ) {}

  @ResolveField(() => UserOutput, { name: 'user', nullable: true })
  async user(@Parent() bookmarkEntity: BookmarkEntity) {
    const userId = bookmarkEntity.user;
    if (userId == null) {
      return null;
    }
    const user = await this.userUseCase.findUserById({ id: userId });
    return user.result;
  }

  @ResolveField(() => PostOutput, { name: 'post', nullable: true })
  async post(@Parent() bookmarkEntity: BookmarkEntity) {
    const postId = bookmarkEntity.post;
    if (postId == null) return null;
    switch (bookmarkEntity.type) {
      case CollectionName.BUSINESS: {
        return {
          businessEntity: await this.loader.batchBusiness.load(postId),
        };
      }
    }
    return [];
  }
}

export const BookmarkResolvers = [
  BookmarkQueryResolver,
  BookmarkMutationResolver,
  BookmarkResolver,
];
