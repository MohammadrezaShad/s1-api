import { FindReviewByPostHandler } from '@/modules/review/query/find-review-by-post/find-review-by-post.handler';

import { FindReviewByIdHandler } from './find-review-by-id/find-review-by-id.handler';
import { FindReviewByIdsHandler } from './find-review-by-ids/find-review-by-ids.handler';
import { SearchReviewHanler } from './search-review/search-review.handler';
import { GetVotesDetailHandler } from './get-votes-detail/get-votes-detail.handler';

export const ReviewQueryHandlers = [
  FindReviewByIdHandler,
  FindReviewByIdsHandler,
  FindReviewByPostHandler,
  SearchReviewHanler,
  GetVotesDetailHandler,
];
