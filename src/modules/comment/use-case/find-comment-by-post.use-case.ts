import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindCommentByPostQuery } from '@/modules/comment/query/find-comment-by-post/find-comment-by-post.query';

import {
  FindCommentsByPostInput,
  FindCommentsOutput,
} from '../dto/find-comment.dto';
import { CommentEntityFactory } from '../entity/comment.factory';
import { CommentModel } from '../model/comment.model';

@Injectable()
export class FindCommentByPostUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commentEntityFactory: CommentEntityFactory,
  ) {}

  async findCommentByPost({
    post,
  }: FindCommentsByPostInput): Promise<FindCommentsOutput> {
    try {
      const comments: CommentModel[] = await this.queryBus.execute(
        new FindCommentByPostQuery(post),
      );

      const resultList = comments.map(model =>
        this.commentEntityFactory.create(model),
      );

      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
