import { FindAnswerByIdHandler } from './find-answer-by-id/find-answer-by-id.handler';
import { FindAnswerByIdsHandler } from './find-answer-by-ids/find-answer-by-ids.handler';
import { FindAnswerByQuestionHandler } from './find-answer-by-question/find-answer-by-question.handler';
import { SearchAnswerHanler } from './search-answer/search-answer.handler';

export const AnswerQueryHandlers = [
  FindAnswerByIdHandler,
  FindAnswerByIdsHandler,
  FindAnswerByQuestionHandler,
  SearchAnswerHanler,
];
