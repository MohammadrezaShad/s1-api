import { SearchReviewInput } from '../../dto/search-review.dto';

export class SearchReviewQuery {
  constructor(readonly searchReviewInput: SearchReviewInput) {}
}
