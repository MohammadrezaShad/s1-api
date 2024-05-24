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
import { CommentQuery, MutateCommentResponse } from './dto/comment.dto';
import { SearchCommentUseCase } from './use-case/search-comment.use-case';
import { FindCommentByIdUseCase } from './use-case/find-comment-by-id.use-case';
import { FindCommentByIdsUseCase } from './use-case/find-comment-by-ids.use-case';
import {
  FindCommentInput,
  FindCommentOutput,
  FindCommentsInput,
  FindCommentsOutput,
} from './dto/find-comment.dto';
import {
  PostOutput,
  SearchCommentInput,
  SearchCommentOutput,
} from './dto/search-comment.dto';
import { CreateCommentUseCase } from './use-case/create-comment.use-case';
import { UpdateCommentUseCase } from './use-case/update-comment.use-case';
import { DeleteCommentUseCase } from './use-case/delete-comment.use-case';
import { BulkDeleteCommentUseCase } from './use-case/bulk-delete-comment.use-case';
import { CreateAdminCommentUseCase } from './use-case/create-admin-comment.use-case';
import { EditCommentUseCase } from './use-case/edit-comment.use-case';
import { RemoveCommentUseCase } from './use-case/remove-comment.use-case';
import {
  CreateAdminCommentInput,
  CreateCommentInput,
  CreateCommentOutput,
} from './dto/create-comment.dto';
import {
  UpdateCommentInput,
  UpdateCommentOutput,
} from './dto/update-comment.dto';
import { EditCommentInput, EditCommentOutput } from './dto/edit-comment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
  DeleteCommentsInput,
  RemoveCommentInput,
} from './dto/delete-comment.dto';
import { CommentEntity } from './entity/comment.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { ClientId } from '@/common/decorators/client-id.decorator';
import { UseGuards } from '@nestjs/common';
import CommentDataLoader from './comment.loader';
import { CommentType } from './enum/comment-type.enum';
import { UserOutput } from '../user/dto/user.output';

const COMMENTS_LIMIT = 100;
const COMMENTS_INDEX = 1;

@Resolver(() => CommentQuery)
export class CommentQueryResolver {
  constructor(
    private readonly searchCommentUseCase: SearchCommentUseCase,
    private readonly findCommentByIdUseCase: FindCommentByIdUseCase,
    private readonly findCommentByIdsUseCase: FindCommentByIdsUseCase,
  ) {}

  @Query(() => CommentQuery)
  async comment() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindCommentOutput)
  async findCommentById(
    @Args('input') input: FindCommentInput,
  ): Promise<FindCommentOutput> {
    return this.findCommentByIdUseCase.findCommentById(input);
  }

  @ResolveField(() => FindCommentsOutput)
  async findCommentByIds(
    @Args('input') input: FindCommentsInput,
  ): Promise<FindCommentsOutput> {
    return this.findCommentByIdsUseCase.findCommentByIds(input);
  }

  @ResolveField(() => SearchCommentOutput)
  async searchComment(
    @Args('input') input: SearchCommentInput,
  ): Promise<SearchCommentOutput> {
    return this.searchCommentUseCase.search(input);
  }
}

@Resolver(() => MutateCommentResponse)
export class CommentMutationResolver {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly createAdminCommentUseCase: CreateAdminCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly editCommentUseCase: EditCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    private readonly removeCommentUseCase: RemoveCommentUseCase,
    private readonly bulkDeleteCommentUseCase: BulkDeleteCommentUseCase,
  ) {}

  @Mutation(() => MutateCommentResponse)
  async comment() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateCommentOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_Comment, Permission.CREATE)
  async createComment(
    @Args('input') input: CreateCommentInput,
    @GetUser() user: UserEntity,
    @ClientId() clientId: string,
  ): Promise<CreateCommentOutput> {
    return this.createCommentUseCase.createComment({
      ...input,
      user: user ? user._id.toHexString() : null,
      client: clientId,
    });
  }

  @ResolveField(() => CreateCommentOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_Comment, Permission.CREATE)
  async createAdminComment(
    @Args('input') input: CreateAdminCommentInput,
    @GetUser() user: UserEntity,
  ): Promise<CreateCommentOutput> {
    return this.createAdminCommentUseCase.createAdminComment({
      ...input,
      user: user ? user._id.toHexString() : null,
    });
  }

  @ResolveField(() => UpdateCommentOutput)
  // @PanelGuard<MethodDecorator>(Permission.UPDATE_Comment, Permission.UPDATE)
  async updateComment(
    @Args('input') input: UpdateCommentInput,
  ): Promise<UpdateCommentOutput> {
    return this.updateCommentUseCase.updateComment(input);
  }

  @ResolveField(() => EditCommentOutput)
  // @PanelGuard<MethodDecorator>(Permission.UPDATE_Comment, Permission.UPDATE)
  async editComment(
    @Args('input') input: EditCommentInput,
    @GetUser() user: UserEntity,
  ): Promise<EditCommentOutput> {
    return this.editCommentUseCase.editComment({
      ...input,
      user: user ? user._id.toHexString() : null,
    });
  }

  @ResolveField(() => DeleteCommentOutput)
  // @PanelGuard<MethodDecorator>(Permission.DELETE_Comment, Permission.DELETE)
  async deleteComment(
    @Args('input') input: DeleteCommentInput,
  ): Promise<DeleteCommentOutput> {
    return this.deleteCommentUseCase.deleteComment(input);
  }

  @ResolveField(() => DeleteCommentOutput)
  // @PanelGuard<MethodDecorator>(Permission.DELETE_Comment, Permission.DELETE)
  async removeComment(
    @Args('input') input: RemoveCommentInput,
    @GetUser() user: UserEntity,
  ): Promise<DeleteCommentOutput> {
    return this.removeCommentUseCase.removeComment({
      ...input,
      user: user ? user._id.toHexString() : null,
    });
  }

  @ResolveField(() => DeleteCommentOutput)
  // @PanelGuard<MethodDecorator>(
  //   Permission.BULK_DELETE_Comment,
  //   Permission.BULK_DELETE,
  // )
  async bulkDeleteComment(
    @Args('input') input: DeleteCommentsInput,
  ): Promise<DeleteCommentOutput> {
    return this.bulkDeleteCommentUseCase.bulkDeleteComment(input);
  }
}

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(
    private readonly loader: CommentDataLoader,
    private readonly searchCommentUseCase: SearchCommentUseCase,
  ) {}
  @ResolveField(() => CommentEntity, { name: 'parent', nullable: true })
  async result(@Parent() comments: CommentEntity) {
    const parentId = comments.parent;

    if (parentId == null) return null;
    return this.loader.batchComments.load(parentId);
  }

  @ResolveField(() => [CommentEntity], { name: 'childs', nullable: true })
  async childs(@Parent() comment: CommentEntity) {
    const commentId = comment._id;
    const { results } = await this.searchCommentUseCase.search({
      post: comment.post,
      parent: commentId.toHexString(),
      page: COMMENTS_INDEX,
      count: COMMENTS_LIMIT,
    });

    return results;
  }

  // @ResolveField(() => UserOutput, { name: 'createUser', nullable: true })
  // async createUser(@Parent() comment: CommentEntity) {
  //   const userId = comment.createUser;
  //   if (userId == null) {
  //     return null;
  //   }
  //   return this.loader.batchUsers.load(userId);
  // }

  @ResolveField(() => PostOutput, { name: 'post', nullable: true })
  async post(@Parent() comment: CommentEntity) {
    const postId = comment.post;
    if (postId == null) return null;
    switch (comment.type) {
      case CommentType.BUSINESS: {
        return {
          businessEntity: await this.loader.batchBusiness.load(postId),
        };
      }
    }
  }
}

export const CommentResolvers = [
  CommentQueryResolver,
  CommentMutationResolver,
  CommentResolver,
];
