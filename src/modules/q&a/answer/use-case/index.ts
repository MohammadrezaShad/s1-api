import { BulkDeleteAnswerUseCase } from './bulk-delete-answer.use-case';
import { CreateAnswerUseCase } from './create-answer.use-case';
import { DeleteAnswerUseCase } from './delete-answer.use-case';
import { FindAnswerByIdUseCase } from './find-answer-by-id.use-case';
import { FindAnswerByIdsUseCase } from './find-answer-by-ids.use-case';
import { FindAnswerByQuestionUseCase } from './find-answer-by-question.use-case';
import { SearchAnswerUseCase } from './search-answer.use-case';
import { UpdateAnswerUseCase } from './update-answer.use-case';

export const AnswerUseCases = [
  CreateAnswerUseCase,
  UpdateAnswerUseCase,
  DeleteAnswerUseCase,
  BulkDeleteAnswerUseCase,
  FindAnswerByIdUseCase,
  FindAnswerByIdsUseCase,
  FindAnswerByQuestionUseCase,
  SearchAnswerUseCase,
];
