import { SearchAnswerInput } from '../../dto/search-answer.dto';

export class SearchAnswerQuery {
  constructor(readonly searchAnswerInput: SearchAnswerInput) {}
}
