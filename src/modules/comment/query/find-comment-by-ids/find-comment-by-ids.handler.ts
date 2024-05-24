import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommentByIdsQuery } from './find-comment-by-ids.query';
import { CommentRepository } from '../../comment.repository';
import { CommentModel } from '../../model/comment.model';

@QueryHandler(FindCommentByIdsQuery)
export class FindCommentbyIdsHandler
  implements IQueryHandler<FindCommentByIdsQuery>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({ ids }: FindCommentByIdsQuery): Promise<CommentModel[]> {
    return this.commentRepository.findManyById(ids);
  }
}
