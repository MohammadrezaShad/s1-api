import { FindQuestionByBusinessHandler } from './find-question-by-business/find-question-by-business.handler';
import { FindQuestionByIdHandler } from './find-question-by-id/find-question-by-id.handler';
import { FindQuestionByIdsQuery } from './find-question-by-ids/find-question-by-ids.query';
import { SearchQuestionHanler } from './search-question/search-question.handler';

export const QuestionQueryHandlers = [
  FindQuestionByIdHandler,
  FindQuestionByIdsQuery,
  FindQuestionByBusinessHandler,
  SearchQuestionHanler,
];
