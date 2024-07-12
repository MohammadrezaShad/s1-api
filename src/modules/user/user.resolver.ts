import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { CoreOutput } from '@/common/dtos/output.dto';
import { Permission } from '@/common/permissions/permission-type';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';
import { BookmarkEntity } from '@/modules/bookmark/entity/bookmark.entity';
import { GetBookmarksByUserUseCase } from '@/modules/bookmark/use-case/get-bookmarks-by-user.use-case';
import { FavoriteEntity } from '@/modules/favorite/entity/favorite.entity';
import { GetFavoritesByUserUseCase } from '@/modules/favorite/use-case/get-favorite-by-user.use-case';
import {
  CreateUserInput,
  CreateUserOutput,
} from '@/modules/user/dto/create-user.dto';
import {
  DeleteUserInput,
  DeleteUserOutput,
} from '@/modules/user/dto/delete-user.dto';
import {
  FindManyUserOutput,
  FindUserByEmailInput,
  FindUserByIdInput,
  FindUserByPhoneInput,
  FindUserOutput,
  FindUsersByRoleInput,
} from '@/modules/user/dto/find-user.dto';
import {
  SearchUserInput,
  SearchUserOutput,
} from '@/modules/user/dto/search-user.dto';
import {
  UpdateUserInput,
  UpdateUserOutput,
} from '@/modules/user/dto/update-user.dto';
import { UserMutation, UserQuery } from '@/modules/user/dto/user.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { CreateUserUseCase } from '@/modules/user/use-case/create-user.use-case';
import { DeleteUserUseCase } from '@/modules/user/use-case/delete-user.use-case';
import { FindUserByEmailUseCase } from '@/modules/user/use-case/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';
import { FindUsersByRoleUseCase } from '@/modules/user/use-case/find-users-by-role.use-case';
import { SearchUserUseCase } from '@/modules/user/use-case/search-user.use-case';
import { UpdateUserUseCase } from '@/modules/user/use-case/update-user.use-case';
import UserDataLoader from '@/modules/user/user.loader';

import { PanelGuard } from '../auth/guards/panel.guard';
import { FindUserByPhoneOrEmailAndIsVerifiedUseCase } from './use-case/find-user-by-phone-or-email-and-is-verified.use-case';
import ImageLoader from '../image/image.loader';
import { ImageEntity } from '../image/entity/image.entity';
import { FindReviewByUserUseCase } from '../review/use-case/find-review-by-user.use-case';
import { GqlOptionalAuthGuard } from '../auth/guards/gql-optional-auth.guard';

@Resolver(() => UserQuery)
export class UserQueryResolver {
  constructor(
    private readonly searchUserUseCase: SearchUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByPhoneUseCase: FindUserByPhoneOrEmailAndIsVerifiedUseCase,
    private readonly findUsersByRoleUseCase: FindUsersByRoleUseCase,
  ) {}

  @Query(() => UserQuery)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindUserOutput)
  async findUserById(
    @Args('input') input: FindUserByIdInput,
  ): Promise<FindUserOutput> {
    return this.findUserByIdUseCase.findUserById(input);
  }

  @ResolveField(() => FindUserOutput)
  async findUserByEmail(
    @Args('input') input: FindUserByEmailInput,
  ): Promise<FindUserOutput> {
    return this.findUserByEmailUseCase.findUserByEmail(input);
  }

  @ResolveField(() => CoreOutput)
  async findUserByPhoneAndIsVerified(
    @Args('input') input: FindUserByPhoneInput,
  ): Promise<CoreOutput> {
    return this.findUserByPhoneUseCase.findUserByPhoneOrEmailAndIsVerified(
      input,
    );
  }

  @ResolveField(() => FindManyUserOutput)
  async findUsersByRole(
    @Args('input') input: FindUsersByRoleInput,
  ): Promise<FindManyUserOutput> {
    return this.findUsersByRoleUseCase.findUsersByRole(input);
  }

  @ResolveField(() => SearchUserOutput)
  async searchUser(
    @Args('input') input: SearchUserInput,
  ): Promise<SearchUserOutput> {
    return this.searchUserUseCase.search(input);
  }
}

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Mutation(() => UserMutation)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateUserOutput)
  @PanelGuard<MethodDecorator>(Permission.CREATE_USER, Permission.CREATE)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.createUserUseCase.createUser(input);
  }

  @ResolveField(() => UpdateUserOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_USER, Permission.UPDATE)
  async updateUser(
    @Args('input') input: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.updateUserUseCase.updateUser(input);
  }

  @ResolveField(() => DeleteUserOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_USER, Permission.DELETE)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
  ): Promise<DeleteUserOutput> {
    return this.deleteUserUseCase.deleteUser(input);
  }
}

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly loader: UserDataLoader,
    private readonly imageLoader: ImageLoader,
    private readonly getBookmarksByUserUseCase: GetBookmarksByUserUseCase,
    private readonly getFavoritesByUserUseCase: GetFavoritesByUserUseCase,
    private readonly findReviewByUserUseCase: FindReviewByUserUseCase,
  ) {}

  @ResolveField(() => [PermissionEntity], { nullable: true })
  async permissions(@Parent() user: UserEntity) {
    const permissions = await this.loader.batchPermission.load(
      user.permissions,
    );
    if (!permissions) return [];
    return permissions;
  }

  @ResolveField(() => [RoleEntity], { nullable: true })
  async roles(@Parent() user: UserEntity) {
    const roles = await this.loader.batchRole.load(user.roles);
    if (!roles) return [];
    return roles;
  }

  @ResolveField(() => [BookmarkEntity], { nullable: true })
  async bookmarks(@Parent() user: UserEntity) {
    const bookmarks = await this.getBookmarksByUserUseCase.getBookmarksByUser({
      user: user._id.toString(),
    });
    if (!bookmarks) return [];
    return bookmarks.results;
  }

  @ResolveField(() => [FavoriteEntity], { nullable: true })
  async favorites(@Parent() user: UserEntity) {
    const favorites = await this.getFavoritesByUserUseCase.getFavoritesByUser(
      user._id.toString(),
    );
    if (!favorites) return [];
    return favorites.results;
  }

  @ResolveField(() => ImageEntity, { name: 'avatar', nullable: true })
  async avatar(@Parent() user: UserEntity) {
    const imageId = user.avatar;
    if (!imageId) return null;
    return this.imageLoader.batchImage.load(imageId);
  }

  @ResolveField(() => Number, { name: 'reviewCount', nullable: true })
  @UseGuards(GqlOptionalAuthGuard)
  async reviewCount(@GetUser() user: UserEntity) {
    const review = await this.findReviewByUserUseCase.findReviewByUser(
      user ? user._id.toString() : null,
    );
    return review.results.length;
  }
}

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  UserResolver,
];
