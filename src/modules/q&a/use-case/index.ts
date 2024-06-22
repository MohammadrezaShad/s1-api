import { CreateAnswerFromQuestionUseCase } from '@/modules/q&a/use-case/create-answer.use-case';

import { BulkDeleteQuestionUseCase } from './bulk-delete-question.use-case';
import { CreateQuestionUseCase } from './create-question.use-case';
import { DeleteQuestionUseCase } from './delete-question.use-case';
import { FindQuestionByIdUseCase } from './find-question-by-id.use-case';
import { FindQuestionByIdsUseCase } from './find-question-by-ids.use-case';
import { FindQuestionByPostUseCase } from './find-question-by-post.use-case';
import { SearchQuestionUseCase } from './search-question.use-case';
import { UpdateQuestionUseCase } from './update-question.use-case';

export const QuestionUseCases = [
  CreateQuestionUseCase,
  UpdateQuestionUseCase,
  DeleteQuestionUseCase,
  BulkDeleteQuestionUseCase,
  FindQuestionByIdUseCase,
  FindQuestionByIdsUseCase,
  FindQuestionByPostUseCase,
  SearchQuestionUseCase,

  CreateAnswerFromQuestionUseCase,
];
