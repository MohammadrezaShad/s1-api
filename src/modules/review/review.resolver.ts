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
import { Permission } from '@/common/permissions/permission-type';
import {
  DeleteManyReviewInput,
  DeleteReviewInput,
  DeleteReviewOutput,
  RemoveReviewInput,
} from '@/modules/review/dto/delete-review.dto';
import {
  EditReviewInput,
  EditReviewOutput,
} from '@/modules/review/dto/edit-review.dto';
import {
  FindManyReviewByPostInput,
  FindManyReviewInput,
  FindManyReviewOutput,
  FindReviewInput,
  FindReviewOutput,
} from '@/modules/review/dto/find-review.dto';
import { ReviewEntity } from '@/modules/review/entity/review.entity';
import { FindReviewByIdsUseCase } from '@/modules/review/use-case/find-review-by-ids.use-case';
import { FindReviewByPostUseCase } from '@/modules/review/use-case/find-review-by-post.use-case';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { PanelGuard } from '../auth/guards/panel.guard';
import { UserOutput } from '../user/dto/user.output';
import { UserEntity } from '../user/entity/user.entity';
import { FindUserByIdUseCase } from '../user/use-case/find-user-by-id.use-case';
import {
  CreateAdminReviewInput,
  CreateReviewInput,
  CreateReviewOutput,
} from './dto/create-review.dto';
import { MutateReviewResponse, ReviewQuery } from './dto/review.dto';
import { SearchReviewInput, SearchReviewOutput } from './dto/search-review.dto';
import { UpdateReviewInput, UpdateReviewOutput } from './dto/update-review.dto';
import { ReviewType } from './enum/review-type.enum';
import ReviewDataLoader from './review.loader';
import { BulkDeleteReviewUseCase } from './use-case/bulk-delete-review.use-case';
import { CreateAdminReviewUseCase } from './use-case/create-admin-review.use-case';
import { CreateReviewUseCase } from './use-case/create-review.use-case';
import { DeleteReviewUseCase } from './use-case/delete-review.use-case';
import { EditReviewUseCase } from './use-case/edit-review.use-case';
import { FindReviewByIdUseCase } from './use-case/find-review-by-id.use-case';
import { RemoveReviewUseCase } from './use-case/remove-review.use-case';
import { SearchReviewUseCase } from './use-case/search-review.use-case';
import { UpdateReviewUseCase } from './use-case/update-review.use-case';
import { GetVotesDetailUseCase } from './use-case/get-votes-detail.use-case';
import { GetVotesDetailInput, VotesDetail } from './dto/votes-detail.dto';

const REVIEW_LIMIT = 100;
const REVIEW_INDEX = 1;

@Resolver(() => ReviewQuery)
export class ReviewQueryResolver {
  constructor(
    private readonly searchReviewUseCase: SearchReviewUseCase,
    private readonly findReviewByIdUseCase: FindReviewByIdUseCase,
    private readonly findReviewByPostUseCase: FindReviewByPostUseCase,
    private readonly findReviewByIdsUseCase: FindReviewByIdsUseCase,
    private readonly getVotesDetailUseCase: GetVotesDetailUseCase,
  ) {}

  @Query(() => ReviewQuery)
  async review() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindReviewOutput)
  async findReviewById(
    @Args('input') input: FindReviewInput,
  ): Promise<FindReviewOutput> {
    return this.findReviewByIdUseCase.findReviewById(input);
  }

  @ResolveField(() => FindManyReviewOutput)
  async findReviewByPost(
    @Args('input') input: FindManyReviewByPostInput,
  ): Promise<FindManyReviewOutput> {
    return this.findReviewByPostUseCase.findReviewByPost(input);
  }

  @ResolveField(() => FindManyReviewOutput)
  async findReviewByIds(
    @Args('input') input: FindManyReviewInput,
  ): Promise<FindManyReviewOutput> {
    return this.findReviewByIdsUseCase.findReviewByIds(input);
  }

  @ResolveField(() => SearchReviewOutput)
  async searchReview(
    @Args('input') input: SearchReviewInput,
  ): Promise<SearchReviewOutput> {
    return this.searchReviewUseCase.search(input);
  }

  @ResolveField(() => [VotesDetail])
  async getVotesDetail(
    @Args('input') input: GetVotesDetailInput,
  ): Promise<VotesDetail[]> {
    return this.getVotesDetailUseCase.getVotesDetail(input);
  }
}

@Resolver(() => MutateReviewResponse)
export class ReviewMutationResolver {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly createAdminReviewUseCase: CreateAdminReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
    private readonly editReviewUseCase: EditReviewUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
    private readonly removeReviewUseCase: RemoveReviewUseCase,
    private readonly bulkDeleteReviewUseCase: BulkDeleteReviewUseCase,
  ) {}

  @Mutation(() => MutateReviewResponse)
  async review() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateReviewOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async createReview(
    @Args('input') input: CreateReviewInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateReviewOutput> {
    return this.createReviewUseCase.createReview({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => CreateReviewOutput)
  @PanelGuard<MethodDecorator>(
    Permission.CREATE_ADMIN_REVIEW,
    Permission.CREATE,
  )
  async createAdminReview(
    @Args('input') input: CreateAdminReviewInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateReviewOutput> {
    return this.createAdminReviewUseCase.createAdminReview({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => UpdateReviewOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_REVIEW, Permission.UPDATE)
  async updateReview(
    @Args('input') input: UpdateReviewInput,
  ): Promise<UpdateReviewOutput> {
    return this.updateReviewUseCase.updateReview(input);
  }

  @ResolveField(() => EditReviewOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async editReview(
    @Args('input') input: EditReviewInput,
    @GetUser() user: UserEntity,
  ): Promise<EditReviewOutput> {
    return this.editReviewUseCase.editReview({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => DeleteReviewOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_REVIEW, Permission.DELETE)
  async deleteReview(
    @Args('input') input: DeleteReviewInput,
  ): Promise<DeleteReviewOutput> {
    return this.deleteReviewUseCase.deleteReview(input);
  }

  @ResolveField(() => DeleteReviewOutput)
  @PanelGuard<MethodDecorator>(Permission.REGULAR_USER)
  async removeReview(
    @Args('input') input: RemoveReviewInput,
    @GetUser() user: UserEntity,
  ): Promise<DeleteReviewOutput> {
    return this.removeReviewUseCase.removeReview({
      ...input,
      user: user ? user._id.toString() : null,
    });
  }

  @ResolveField(() => DeleteReviewOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_REVIEW,
    Permission.BULK_DELETE,
  )
  async bulkDeleteReview(
    @Args('input') input: DeleteManyReviewInput,
  ): Promise<DeleteReviewOutput> {
    return this.bulkDeleteReviewUseCase.bulkDeleteReview(input);
  }
}

@Resolver(() => ReviewEntity)
export class ReviewResolver {
  constructor(
    private readonly loader: ReviewDataLoader,
    private readonly searchReviewUseCase: SearchReviewUseCase,
    private readonly userUseCase: FindUserByIdUseCase,
  ) {}
  @ResolveField(() => ReviewEntity, { name: 'parent', nullable: true })
  async result(@Parent() review: ReviewEntity) {
    const parentId = review.parent;
    if (parentId == null) return null;
    return this.loader.batchReview.load(parentId);
  }

  @ResolveField(() => [ReviewEntity], { name: 'childs', nullable: true })
  async childs(@Parent() review: ReviewEntity) {
    const reviewId = review._id;
    const { results } = await this.searchReviewUseCase.search({
      post: review.post,
      parent: reviewId.toHexString(),
      page: REVIEW_INDEX,
      count: REVIEW_LIMIT,
    });

    return results;
  }

  @ResolveField(() => UserOutput, { name: 'createUser', nullable: true })
  async createUser(@Parent() review: ReviewEntity) {
    const userId = review.createUser;
    if (userId == null) {
      return null;
    }
    const user = await this.userUseCase.findUserById({ id: userId });
    return user.result;
  }

  @ResolveField(() => PostOutput, { name: 'post', nullable: true })
  async post(@Parent() review: ReviewEntity) {
    const postId = review.post;
    if (postId == null) return null;
    switch (review.type) {
      case ReviewType.BUSINESS: {
        return {
          businessEntity: await this.loader.batchBusiness.load(postId),
        };
      }
    }
  }
}

export const ReviewResolvers = [
  ReviewQueryResolver,
  ReviewMutationResolver,
  ReviewResolver,
];
