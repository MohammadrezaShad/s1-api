import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import {
  CreateTaxonomyInput,
  CreateTaxonomyOutput,
} from '@/modules/taxonomy/dto/create-taxonomy.dto';
import {
  DeleteTaxonomyInput,
  DeleteTaxonomyOutput,
} from '@/modules/taxonomy/dto/delete-taxonomy.dto';
import {
  FindTaxonomyByIdsInput,
  FindTaxonomyByIdsOutput,
  FindTaxonomyBySlugInput,
  FindTaxonomyInput,
  FindTaxonomyOutput,
} from '@/modules/taxonomy/dto/find-taxonomy.dto';
import {
  SearchTaxonomyInput,
  SearchTaxonomyOutput,
} from '@/modules/taxonomy/dto/search-taxonomy.dto';
import {
  TaxonomyMutation,
  TaxonomyQuery,
} from '@/modules/taxonomy/dto/taxonomy.dto';
import {
  UpdateTaxonomyInput,
  UpdateTaxonomyOutput,
} from '@/modules/taxonomy/dto/update-taxonomy.dto';
import { CreateTaxonomyUseCase } from '@/modules/taxonomy/use-case/create-taxonomy.use-case';
import { DeleteTaxonomyUseCase } from '@/modules/taxonomy/use-case/delete-taxonomy.use-case';
import { FindTaxonomyByIdUseCase } from '@/modules/taxonomy/use-case/find-taxonomy.use-case';
import { FindTaxonomyBySlugUseCase } from '@/modules/taxonomy/use-case/find-taxonomy-by-slug.use-case';
import { SearchTaxonomyUseCase } from '@/modules/taxonomy/use-case/search-taxonomy.use-case';
import { UpdateTaxonomyUseCase } from '@/modules/taxonomy/use-case/update-taxonomy.use-case';
import { PanelGuard } from '../auth/guards/panel.guard';
import { Permission } from '@/common/permissions/permission-type';
import { FindTaxonomyByIdsUseCase } from './use-case/find-taxonomy-by-ids.use-case';

@Resolver(() => TaxonomyQuery)
export class TaxonomyQueryResolver {
  constructor(
    private readonly findTaxonomyUseCase: FindTaxonomyByIdUseCase,
    private readonly findTaxonomyByIdsUseCase: FindTaxonomyByIdsUseCase,
    private readonly findTaxonomyBySlugUseCase: FindTaxonomyBySlugUseCase,
    private readonly searchTaxonomyUseCase: SearchTaxonomyUseCase,
  ) {}

  @Query(() => TaxonomyQuery)
  async taxonomy() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindTaxonomyOutput)
  async findTaxonomyById(
    @Args('input') { id }: FindTaxonomyInput,
  ): Promise<FindTaxonomyOutput> {
    return this.findTaxonomyUseCase.findTaxonomyById(id);
  }

  @ResolveField(() => FindTaxonomyByIdsOutput)
  async findTaxonomyByIds(
    @Args('input') { ids }: FindTaxonomyByIdsInput,
  ): Promise<FindTaxonomyByIdsOutput> {
    return this.findTaxonomyByIdsUseCase.findTaxonomyByIds(ids);
  }

  @ResolveField(() => FindTaxonomyOutput)
  async findTaxonomyBySlug(
    @Args('input') { slug }: FindTaxonomyBySlugInput,
  ): Promise<FindTaxonomyOutput> {
    return this.findTaxonomyBySlugUseCase.findTaxonomyBySlug(slug);
  }

  @ResolveField(() => SearchTaxonomyOutput)
  async searchTaxonomy(
    @Args('input') input: SearchTaxonomyInput,
  ): Promise<FindTaxonomyOutput> {
    return this.searchTaxonomyUseCase.searchTaxonomy(input);
  }
}

@Resolver(() => TaxonomyMutation)
export class TaxonomyMutationResolver {
  constructor(
    private readonly createTaxonomyUseCase: CreateTaxonomyUseCase,
    private readonly deleteTaxonomyUseCase: DeleteTaxonomyUseCase,
    private readonly updateTaxonomyUseCase: UpdateTaxonomyUseCase,
  ) {}

  @Mutation(() => TaxonomyMutation)
  async taxonomy() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateTaxonomyOutput)
  @PanelGuard<MethodDecorator>(
    Permission.REGULAR_USER,
    Permission.CREATE_TAXONOMY,
    Permission.CREATE,
  )
  async createTaxonomy(
    @Args('input') input: CreateTaxonomyInput,
  ): Promise<CreateTaxonomyOutput> {
    return this.createTaxonomyUseCase.createTaxonomy(input);
  }

  @ResolveField(() => DeleteTaxonomyOutput)
  @PanelGuard<MethodDecorator>(
    Permission.REGULAR_USER,
    Permission.DELETE_TAXONOMY,
    Permission.DELETE,
  )
  async deleteTaxonomy(
    @Args('input') input: DeleteTaxonomyInput,
  ): Promise<CreateTaxonomyOutput> {
    return this.deleteTaxonomyUseCase.deleteTaxonomy(input);
  }

  @ResolveField(() => UpdateTaxonomyOutput)
  @PanelGuard<MethodDecorator>(
    Permission.REGULAR_USER,
    Permission.UPDATE_TAXONOMY,
    Permission.UPDATE,
  )
  async updateTaxonomy(
    @Args('input') input: UpdateTaxonomyInput,
  ): Promise<CreateTaxonomyOutput> {
    return this.updateTaxonomyUseCase.updateTaxonomy(input);
  }
}

export const TaxonomyResolvers = [
  TaxonomyQueryResolver,
  TaxonomyMutationResolver,
];
