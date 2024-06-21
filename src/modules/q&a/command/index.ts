import { BulkDeleteQuestionHandler } from './bulk-delete-question/bulk-delete-question.handler';
import { CreateQuestionHandler } from './create-question/create-question.handler';
import { DeleteQuestionHandler } from './delete-question/delete-question.handler';
import { UpdateQuestionHandler } from './update-question/update-question.handler';

export const QuestionCommandHandlers = [
  CreateQuestionHandler,
  UpdateQuestionHandler,
  DeleteQuestionHandler,
  BulkDeleteQuestionHandler,
];
