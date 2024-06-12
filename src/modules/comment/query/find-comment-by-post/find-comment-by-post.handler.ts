import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindCommentByPostQuery } from '@/modules/comment/query/find-comment-by-post/find-comment-by-post.query';

import { CommentRepository } from '../../comment.repository';
import { CommentModel } from '../../model/comment.model';

@QueryHandler(FindCommentByPostQuery)
export class FindCommentbyPostHandler
  implements IQueryHandler<FindCommentByPostQuery>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({ post }: FindCommentByPostQuery): Promise<CommentModel[]> {
    return this.commentRepository.findCommentsByPost(post);
  }
}
