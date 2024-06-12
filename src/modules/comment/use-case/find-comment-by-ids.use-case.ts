import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { COMMENT_NOT_FOUND } from '../constant/error-message.constant';
import { FindCommentsInput, FindCommentsOutput } from '../dto/find-comment.dto';
import { CommentEntityFactory } from '../entity/comment.factory';
import { CommentModel } from '../model/comment.model';
import { FindCommentByIdsQuery } from '../query/find-comment-by-ids/find-comment-by-ids.query';

@Injectable()
export class FindCommentByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commentEntityFactory: CommentEntityFactory,
  ) {}

  async findCommentByIds({
    commentIds,
  }: FindCommentsInput): Promise<FindCommentsOutput> {
    try {
      const comments: CommentModel[] = await this.queryBus.execute(
        new FindCommentByIdsQuery(commentIds),
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
