import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { ClientId } from '@/common/decorators/client-id.decorator';
import { Permission } from '@/common/permissions/permission-type';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';
import { AccessTokenGuard } from '@/modules/auth/guards/access-token.guard';
import {
  CreateFavoriteInput,
  CreateFavoriteOutput,
} from '@/modules/favorite/dto/create-favorite.dto';
import {
  DeleteFavoriteInput,
  DeleteFavoriteOutput,
  DeleteFavoritesInput,
  DeleteOneFavoriteInput,
} from '@/modules/favorite/dto/delete-favorite.dto';
import {
  FavoriteResponse,
  MutateFavoriteResponse,
} from '@/modules/favorite/dto/favorite.dto';
import {
  FindFavoriteInput,
  FindFavoriteOutput,
  FindFavoritesInput,
  FindFavoritesOutput,
} from '@/modules/favorite/dto/find-favorite.dto';
import {
  SearchFavoriteInput,
  SearchFavoriteOutput,
} from '@/modules/favorite/dto/search-favorite.dto';
import {
  UpdateFavoriteInput,
  UpdateFavoriteOutput,
} from '@/modules/favorite/dto/update-favorite.dto';
import { FavoriteEntity } from '@/modules/favorite/entity/favorite.entity';
import { BulkDeleteFavoriteUseCase } from '@/modules/favorite/use-case/bulk-delete-favorite.use-case';
import { CreateFavoriteUseCase } from '@/modules/favorite/use-case/create-favorite.use-case';
import { DeleteFavoriteUseCase } from '@/modules/favorite/use-case/delete-favorite.use-case';
import { DeleteOneFavoriteUseCase } from '@/modules/favorite/use-case/delete-one-favorite.use-case';
import { FindFavoriteByIdUseCase } from '@/modules/favorite/use-case/find-favorite-by-id.use-case';
import { FindFavoriteByIdsUseCase } from '@/modules/favorite/use-case/find-favorite-by-ids.use-case';
import { SearchFavoriteUseCase } from '@/modules/favorite/use-case/search-favorite.use-case';
import { UpdateFavoriteUseCase } from '@/modules/favorite/use-case/update-favorite.use-case';
import { UserEntity } from '@/modules/user/entity/user.entity';

import { PanelGuard } from '../auth/guards/panel.guard';
import { FindUserByIdUseCase } from '../user/use-case/find-user-by-id.use-case';
import { BookmarkLoader } from '../bookmark/bookmark.loader';
import { UserOutput } from '../user/dto/user.output';
import { PostOutput } from '@/common/dtos/post-output.dto';
import { CollectionName } from '@/common/enums/collection-name.enum';

@Resolver(() => FavoriteResponse)
export class FavoriteQueryResolver {
  constructor(
    private readonly searchFavoriteUseCase: SearchFavoriteUseCase,
    private readonly findFavoriteByIdUseCase: FindFavoriteByIdUseCase,
    private readonly findFavoriteByIdsUseCase: FindFavoriteByIdsUseCase,
  ) {}

  @Query(() => FavoriteResponse)
  async favorite() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindFavoriteOutput)
  async findFavoriteById(
    @Args('input') input: FindFavoriteInput,
  ): Promise<FindFavoriteOutput> {
    return this.findFavoriteByIdUseCase.findFavById(input);
  }

  @ResolveField(() => FindFavoritesOutput)
  async findFavoriteByIds(
    @Args('input') input: FindFavoritesInput,
  ): Promise<FindFavoritesOutput> {
    return this.findFavoriteByIdsUseCase.findFavIds(input);
  }

  @ResolveField(() => SearchFavoriteOutput)
  async searchFavorite(
    @Args('input') input: SearchFavoriteInput,
  ): Promise<SearchFavoriteOutput> {
    return this.searchFavoriteUseCase.search(input);
  }
}

@Resolver(() => MutateFavoriteResponse)
export class FavoriteMutationResolver {
  constructor(
    private readonly createFavoriteUseCase: CreateFavoriteUseCase,
    private readonly updateFavoriteUseCase: UpdateFavoriteUseCase,
    private readonly deleteFavoriteUseCase: DeleteFavoriteUseCase,
    private readonly deleteOneFavoriteUseCase: DeleteOneFavoriteUseCase,
    private readonly bulkDeleteFavoriteUseCase: BulkDeleteFavoriteUseCase,
  ) {}

  @Mutation(() => MutateFavoriteResponse)
  async favorite() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateFavoriteOutput)
  @UseGuards(AccessTokenGuard)
  async createFavorite(
    @Args('input') input: CreateFavoriteInput,
    @GetUser() user: UserEntity,
    @ClientId() clientId: string,
  ): Promise<CreateFavoriteOutput> {
    return this.createFavoriteUseCase.createFav({
      ...input,
      user: user ? user._id.toString() : null,
      client: clientId,
    });
  }

  @ResolveField(() => UpdateFavoriteOutput)
  async updateFavorite(
    @Args('input') input: UpdateFavoriteInput,
  ): Promise<UpdateFavoriteOutput> {
    return this.updateFavoriteUseCase.updateFav(input);
  }

  @ResolveField(() => DeleteFavoriteOutput)
  async deleteFavorite(
    @Args('input') input: DeleteFavoriteInput,
  ): Promise<DeleteFavoriteOutput> {
    return this.deleteFavoriteUseCase.deleteFav(input);
  }

  @ResolveField(() => DeleteFavoriteOutput)
  @UseGuards(AccessTokenGuard)
  async deleteOneFavorite(
    @Args('input') input: DeleteOneFavoriteInput,
    @GetUser() user: UserEntity,
    @ClientId() clientId: string,
  ): Promise<DeleteFavoriteOutput> {
    return this.deleteOneFavoriteUseCase.deleteOneFav({
      ...input,
      clientId: clientId,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => DeleteFavoriteOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_FAVORITE,
    Permission.BULK_DELETE,
  )
  async bulkDeleteFavorite(
    @Args('input') input: DeleteFavoritesInput,
  ): Promise<DeleteFavoriteOutput> {
    return this.bulkDeleteFavoriteUseCase.bulkDeleteFav(input);
  }
}

@Resolver(() => FavoriteEntity)
export class FavoriteResolver {
  constructor(
    private readonly userUseCase: FindUserByIdUseCase,
    private readonly loader: BookmarkLoader,
  ) {}

  @ResolveField(() => UserOutput, { name: 'user', nullable: true })
  async user(@Parent() favoriteEntity: FavoriteEntity) {
    const userId = favoriteEntity.user;
    if (userId == null) {
      return null;
    }
    const user = await this.userUseCase.findUserByid({ id: userId });
    return user.result;
  }

  @ResolveField(() => PostOutput, { name: 'post', nullable: true })
  async post(@Parent() favoriteEntity: FavoriteEntity) {
    const postId = favoriteEntity.post;
    if (postId == null) return null;
    switch (favoriteEntity.type) {
      case CollectionName.BUSINESS: {
        return {
          businessEntity: await this.loader.batchBusiness.load(postId),
        };
      }
    }
    return [];
  }
}

export const FavoriteResolvers = [
  FavoriteQueryResolver,
  FavoriteMutationResolver,
  FavoriteResolver,
];
