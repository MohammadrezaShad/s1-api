import { SearchCommentInput } from '../../dto/search-comment.dto';

export class SearchCommentQuery {
  constructor(readonly searchCommentInput: SearchCommentInput) {}
}
