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
import { CollectionName } from '@/common/enums/collection-name.enum';
import { Permission } from '@/common/permissions/permission-type';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';
import { GqlOptionalAuthGuard } from '@/modules/auth/guards/gql-optional-auth.guard';
import { DeleteOneBusinessUseCase } from '@/modules/business/use-case/delete-one-business.use-case';
import { UpdateOneBusinessUseCase } from '@/modules/business/use-case/update-one-business.use-case';
import { CheckRepeatedFavoriteByUserUseCase } from '@/modules/favorite/use-case/check-repeated-favorite-by-user.use-case';
import { FavoriteCountByPostUseCase } from '@/modules/favorite/use-case/favorite-count-by-post.use-case';
import { UserOutput } from '@/modules/user/dto/user.output';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';

import { PanelGuard } from '../auth/guards/panel.guard';
import { CheckRepeatedBookmarkByUserUseCase } from '../bookmark/use-case/check-repeated-bookmark-by-user.use-case';
import { ImageEntity } from '../image/entity/image.entity';
import ImageLoader from '../image/image.loader';
import { TaxonomyEntity } from '../taxonomy/entity/taxonomy.entity';
import BusinessDataLoader from './business.loader';
import { BusinessMutation, BusinessQuery } from './dto/business.dto';
import {
  CreateBusinessInput,
  CreateBusinessOutput,
} from './dto/create-business.dto';
import {
  BulkDeleteBusinessInput,
  DeleteBusinessInput,
  DeleteBusinessOutput,
} from './dto/delete-business.dto';
import {
  FindBusinessByIdInput,
  FindBusinessByIdsInput,
  FindBusinessOutput,
  FindManyBusinessOutput,
} from './dto/find-business.dto';
import {
  SearchBusinessInput,
  SearchBusinessOutput,
} from './dto/search-business.dto';
import {
  UpdateBusinessInput,
  UpdateBusinessOutput,
} from './dto/update-business.dto';
import { BusinessEntity } from './entity/business.entity';
import { BulkDeleteBusinessUseCase } from './use-case/bulk-delete-business.use-case';
import { CreateBusinessUseCase } from './use-case/create-business.use-case';
import { DeleteBusinessUseCase } from './use-case/delete-business.use-case';
import { FindBusinessByIdUseCase } from './use-case/find-business-by-id.use-case';
import { FindBusinessByIdsUseCase } from './use-case/find-business-by-ids.use-case';
import { SearchBusinessUseCase } from './use-case/search-business.use-case';
import { UpdateBusinessUseCase } from './use-case/update-business.use-case';

@Resolver(() => BusinessQuery)
export class BusinessQueryResolver {
  constructor(
    private readonly searchBusinessUseCase: SearchBusinessUseCase,
    private readonly findBusinessByIdUseCase: FindBusinessByIdUseCase,
    private readonly findBusinessByIdsUseCase: FindBusinessByIdsUseCase,
  ) {}

  @Query(() => BusinessQuery)
  async business() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindBusinessOutput)
  async findBusinessById(
    @Args('input') input: FindBusinessByIdInput,
  ): Promise<FindBusinessOutput> {
    return this.findBusinessByIdUseCase.findBusinessById(input);
  }

  @ResolveField(() => FindManyBusinessOutput)
  async findBusinessByIds(
    @Args('input') input: FindBusinessByIdsInput,
  ): Promise<FindManyBusinessOutput> {
    return this.findBusinessByIdsUseCase.findBusinessByIds(input);
  }

  @ResolveField(() => SearchBusinessOutput)
  async searchBusiness(
    @Args('input') input: SearchBusinessInput,
  ): Promise<SearchBusinessOutput> {
    return this.searchBusinessUseCase.search(input);
  }
}

@Resolver(() => BusinessMutation)
export class BusinessMutationResolver {
  constructor(
    private readonly createBusinessUseCase: CreateBusinessUseCase,
    private readonly updateBusinessUseCase: UpdateBusinessUseCase,
    private readonly updateOneBusinessUseCase: UpdateOneBusinessUseCase,
    private readonly deleteBusinessUseCase: DeleteBusinessUseCase,
    private readonly deleteOneBusinessUseCase: DeleteOneBusinessUseCase,
    private readonly bulkDeletebusinessUseCase: BulkDeleteBusinessUseCase,
  ) {}

  @Mutation(() => BusinessMutation)
  async business() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateBusinessOutput)
  @PanelGuard<MethodDecorator>(
    Permission.REGULAR_USER,
    Permission.CREATE_BUSINESS,
    Permission.CREATE,
  )
  async createBusiness(
    @Args('input') input: CreateBusinessInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateBusinessOutput> {
    return this.createBusinessUseCase.createBusiness({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => UpdateBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_BUSINESS, Permission.UPDATE)
  async updateBusiness(
    @Args('input') input: UpdateBusinessInput,
  ): Promise<UpdateBusinessOutput> {
    return this.updateBusinessUseCase.updateBusiness(input);
  }

  @ResolveField(() => UpdateBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async updateOneBusiness(
    @Args('input') input: UpdateBusinessInput,
    @GetUser() user: UserEntity,
  ): Promise<UpdateBusinessOutput> {
    return this.updateOneBusinessUseCase.updateOneBusiness({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => DeleteBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_BUSINESS, Permission.DELETE)
  async deleteBusiness(
    @Args('input') input: DeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    return this.deleteBusinessUseCase.deleteBusiness(input);
  }

  @ResolveField(() => DeleteBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async deleteOneBusiness(
    @Args('input') input: DeleteBusinessInput,
    @GetUser() user: UserEntity,
  ): Promise<DeleteBusinessOutput> {
    return this.deleteOneBusinessUseCase.deleteOneBusiness({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => DeleteBusinessOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_BUSINESS,
    Permission.BULK_DELETE,
  )
  async bulkDeleteBusiness(
    @Args('input') input: BulkDeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    return this.bulkDeletebusinessUseCase.bulkDeleteBusiness(input);
  }
}

@Resolver(() => BusinessEntity)
export class BusinessResolver {
  constructor(
    private readonly imageLoader: ImageLoader,
    private readonly businessLoader: BusinessDataLoader,
    private readonly favoriteCountByPostUseCase: FavoriteCountByPostUseCase,
    private readonly checkRepeatedFavoriteByUserUseCase: CheckRepeatedFavoriteByUserUseCase,
    private readonly checkRepeatedBookmarkByUserUseCase: CheckRepeatedBookmarkByUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @ResolveField(() => Number)
  async favoriteCount(@Parent() business: BusinessEntity) {
    const id = business._id.toString();
    return this.favoriteCountByPostUseCase.favoriteCountByPost(id);
  }

  @ResolveField(() => Boolean)
  @UseGuards(GqlOptionalAuthGuard)
  async isUserFavorite(
    @Parent() business: BusinessEntity,
    @GetUser() user: UserEntity,
  ) {
    const id = business._id.toString();
    return this.checkRepeatedFavoriteByUserUseCase.checkRepeatedFavoriteByUser({
      post: id,
      user: user ? user._id.toString() : null,
      type: CollectionName.BUSINESS,
    });
  }

  @ResolveField(() => Boolean)
  @UseGuards(GqlOptionalAuthGuard)
  async isUserBookmark(
    @Parent() business: BusinessEntity,
    @GetUser() user: UserEntity,
  ) {
    const id = business._id.toString();
    return this.checkRepeatedBookmarkByUserUseCase.checkRepeatedBookmarkByUser({
      post: id,
      user: user ? user._id.toString() : null,
      type: CollectionName.BUSINESS,
    });
  }

  @ResolveField(() => [TaxonomyEntity], { name: 'taxonomies', nullable: true })
  async taxonomies(@Parent() business: BusinessEntity) {
    const taxonomyIds = business.taxonomies;
    if (!taxonomyIds) return null;
    return this.businessLoader.batchTaxonomies.load(taxonomyIds);
  }

  @ResolveField(() => ImageEntity, { name: 'thumbnail', nullable: true })
  async thumbnail(@Parent() business: BusinessEntity) {
    const imageId = business.thumbnail;
    if (!imageId) return null;
    return this.imageLoader.batchImage.load(imageId);
  }

  @ResolveField(() => ImageEntity, { name: 'images', nullable: true })
  async images(@Parent() business: BusinessEntity) {
    const imageIds = business.images;
    if (!imageIds) return null;
    return this.imageLoader.batchImages.load(imageIds);
  }

  @ResolveField(() => UserOutput, { name: 'user', nullable: true })
  async user(@Parent() business: BusinessEntity) {
    const userId = business.user;
    if (!userId) return null;
    const user = await this.findUserByIdUseCase.findUserById({ id: userId });
    return user.result;
  }
}

export const BusinessResolvers = [
  BusinessQueryResolver,
  BusinessMutationResolver,
  BusinessResolver,
];
