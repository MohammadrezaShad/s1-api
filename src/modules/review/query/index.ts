import { FindReviewByPostHandler } from '@/modules/review/query/find-review-by-post/find-review-by-post.handler';
import { GetPostScoreByUserHandler } from '@/modules/review/query/get-post-score-by-user/get-post-score-by-user.handler';

import { FindReviewByIdHandler } from './find-review-by-id/find-review-by-id.handler';
import { FindReviewByIdsHandler } from './find-review-by-ids/find-review-by-ids.handler';
import { GetPostScoreHandler } from './get-post-score/get-post-score.handler';
import { GetVotesDetailHandler } from './get-votes-detail/get-votes-detail.handler';
import { SearchReviewHanler } from './search-review/search-review.handler';
import { FindReviewByUserHandler } from './find-review-by-user/find-review-by-user.handler';

export const ReviewQueryHandlers = [
  FindReviewByIdHandler,
  FindReviewByIdsHandler,
  FindReviewByPostHandler,
  FindReviewByUserHandler,
  SearchReviewHanler,
  GetVotesDetailHandler,
  GetPostScoreHandler,
  GetPostScoreByUserHandler,
];
