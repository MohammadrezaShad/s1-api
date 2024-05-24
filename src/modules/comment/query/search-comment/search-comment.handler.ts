import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchCommentQuery } from './search-business.query';
import { CommentRepository } from '../../comment.repository';
import { SearchCommentOutput } from '../../dto/search-comment.dto';

@QueryHandler(SearchCommentQuery)
export class SearchCommentHanler implements IQueryHandler<SearchCommentQuery> {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({
    searchCommentInput,
  }: SearchCommentQuery): Promise<SearchCommentOutput> {
    const result = await this.commentRepository.search(searchCommentInput);
    return result;
  }
}
