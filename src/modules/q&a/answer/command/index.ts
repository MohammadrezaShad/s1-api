import { BulkDeleteAnswerHandler } from './bulk-delete-answer/bulk-delete-answer.handler';
import { CreateAnswerHandler } from './create-answer/create-answer.handler';
import { DeleteAnswerHandler } from './delete-answer/delete-answer.handler';
import { UpdateAnswerHandler } from './update-answer/update-answer.handler';

export const AnswerCommandHandlers = [
  CreateAnswerHandler,
  UpdateAnswerHandler,
  DeleteAnswerHandler,
  BulkDeleteAnswerHandler,
];
