import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CommentEntityFactory } from '../entity/comment.factory';
import { FindCommentInput, FindCommentOutput } from '../dto/find-comment.dto';
import { FindCommentByIdQuery } from '../query/find-comment-by-id/find-comment-by-id.query';
import { CommentModel } from '../model/comment.model';
import { COMMENT_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindCommentByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commentEntityFactory: CommentEntityFactory,
  ) {}

  async findCommentById({ id }: FindCommentInput): Promise<FindCommentOutput> {
    try {
      const comment: CommentModel = await this.queryBus.execute(
        new FindCommentByIdQuery(id),
      );
      if (!comment) {
        throw new NotFoundException(COMMENT_NOT_FOUND);
      }

      return {
        success: true,
        result: this.commentEntityFactory.create(comment),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
