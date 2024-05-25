import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { Permission } from '@/common/permissions/permission-type';

import { PanelGuard } from '../auth/guards/panel.guard';
import { BusinessMutation, BusinessQuery } from './dto/business.dto';
import { SearchBusinessUseCase } from './use-case/search-business.use-case';
import { FindBusinessByIdUseCase } from './use-case/find-business-by-id.use-case';
import { FindBusinessByIdsUseCase } from './use-case/find-business-by-ids.use-case';
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
import { CreateBusinessUseCase } from './use-case/create-business.use-case';
import { UpdateBusinessUseCase } from './use-case/update-business.use-case';
import { DeleteBusinessUseCase } from './use-case/delete-business.use-case';
import {
  CreateBusinessInput,
  CreateBusinessOutput,
} from './dto/create-business.dto';
import {
  UpdateBusinessInput,
  UpdateBusinessOutput,
} from './dto/update-business.dto';
import {
  BulkDeleteBusinessInput,
  DeleteBusinessInput,
  DeleteBusinessOutput,
} from './dto/delete-business.dto';
import { BusinessEntity } from './entity/business.entity';
import ImageLoader from '../image/image.loader';
import { BulkDeleteBusinessUseCase } from './use-case/bulk-delete-business.use-case';
import { ImageEntity } from '../image/entity/image.entity';

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
    private readonly deleteBusinessUseCase: DeleteBusinessUseCase,
    private readonly bulkDeletebusinessUseCase: BulkDeleteBusinessUseCase,
  ) {}

  @Mutation(() => BusinessMutation)
  async business() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.CREATE_BUSINESS, Permission.CREATE)
  async createBusiness(
    @Args('input') input: CreateBusinessInput,
  ): Promise<CreateBusinessOutput> {
    return this.createBusinessUseCase.createBusiness(input);
  }

  @ResolveField(() => UpdateBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_BUSINESS, Permission.UPDATE)
  async updateBusiness(
    @Args('input') input: UpdateBusinessInput,
  ): Promise<UpdateBusinessOutput> {
    return this.updateBusinessUseCase.updateBusiness(input);
  }

  @ResolveField(() => DeleteBusinessOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_BUSINESS, Permission.DELETE)
  async deleteBusiness(
    @Args('input') input: DeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    return this.deleteBusinessUseCase.deleteBusiness(input);
  }

  @ResolveField(() => DeleteBusinessOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_BUSINESS,
    Permission.BULK_DELETE,
  )
  async bulkDeleteComment(
    @Args('input') input: BulkDeleteBusinessInput,
  ): Promise<DeleteBusinessOutput> {
    return this.bulkDeletebusinessUseCase.bulkDeleteBusiness(input);
  }
}

@Resolver(() => BusinessEntity)
export class BusinessResolver {
  constructor(private readonly imageLoader: ImageLoader) {}

  @ResolveField(() => ImageEntity, { name: 'thumbnail', nullable: true })
  async thumbnail(@Parent() business: BusinessEntity) {
    const imageId = business.thumbnail;
    if (!imageId) return null;
    return this.imageLoader.batchImages.load(imageId);
  }

  @ResolveField(() => ImageEntity, { name: 'images', nullable: true })
  async images(@Parent() business: BusinessEntity) {
    const imageIds = business.images;
    if (!imageIds) return null;
    return [];
  }
}

export const BusinessResolvers = [
  BusinessQueryResolver,
  BusinessMutationResolver,
  BusinessResolver,
];
