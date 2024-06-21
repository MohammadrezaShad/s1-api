import { FindQuestionByIdHandler } from './find-question-by-id/find-question-by-id.handler';
import { FindQuestionByIdsQuery } from './find-question-by-ids/find-question-by-ids.query';
import { FindQuestionByPostHandler } from './find-question-by-post/find-question-by-post.handler';
import { SearchQuestionHanler } from './search-question/search-question.handler';

export const QuestionQueryHandlers = [
  FindQuestionByIdHandler,
  FindQuestionByIdsQuery,
  FindQuestionByPostHandler,
  SearchQuestionHanler,
];
