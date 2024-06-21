import { SearchQuestionInput } from '../../dto/search-question.dto';

export class SearchQuestionQuery {
  constructor(readonly searchReviewInput: SearchQuestionInput) {}
}
