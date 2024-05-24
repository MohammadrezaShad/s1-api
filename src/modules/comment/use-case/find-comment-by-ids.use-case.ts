import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CommentEntityFactory } from '../entity/comment.factory';
import { FindCommentsInput, FindCommentsOutput } from '../dto/find-comment.dto';
import { CommentModel } from '../model/comment.model';
import { FindCommentByIdsQuery } from '../query/find-comment-by-ids/find-comment-by-ids.query';
import { COMMENT_NOT_FOUND } from '../constant/error-message.constant';

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
      if (!comments) {
        throw new NotFoundException(COMMENT_NOT_FOUND);
      }

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
