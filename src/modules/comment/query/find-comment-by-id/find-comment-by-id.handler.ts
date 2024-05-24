import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommentByIdQuery } from './find-comment-by-id.query';
import { CommentRepository } from '../../comment.repository';
import { CommentModel } from '../../model/comment.model';

@QueryHandler(FindCommentByIdQuery)
export class FindCommentbyIdHandler
  implements IQueryHandler<FindCommentByIdQuery>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({ id }: FindCommentByIdQuery): Promise<CommentModel | null> {
    return this.commentRepository.findById(id);
  }
}
