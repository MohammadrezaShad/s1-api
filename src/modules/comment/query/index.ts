import { FindCommentbyPostHandler } from '@/modules/comment/query/find-comment-by-post/find-comment-by-post.handler';

import { FindCommentbyIdHandler } from './find-comment-by-id/find-comment-by-id.handler';
import { FindCommentbyIdsHandler } from './find-comment-by-ids/find-comment-by-ids.handler';
import { SearchCommentHanler } from './search-comment/search-comment.handler';

export const CommentQueryHandlers = [
  FindCommentbyIdHandler,
  FindCommentbyIdsHandler,
  FindCommentbyPostHandler,
  SearchCommentHanler,
];
