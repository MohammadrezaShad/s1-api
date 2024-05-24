import { BulkDeleteCommentHandler } from './bulk-delete-comment/bulk-delete-comment.handler';
import { CreateAdminCommentHandler } from './create-admin-comment/create-comment.handler';
import { CreateCommentHandler } from './create-comment/create-comment.handler';
import { DeleteCommentHandler } from './delete-comment/delete-comment.handler';
import { EditCommentHandler } from './edit-comment/edit-comment.handler';
import { RemoveCommentHandler } from './remove-comment/remove-comment.handler';
import { UpdateCommentHandler } from './update-comment/update-comment.handler';

export const CommentCommandHandlers = [
  CreateCommentHandler,
  CreateAdminCommentHandler,
  UpdateCommentHandler,
  EditCommentHandler,
  DeleteCommentHandler,
  RemoveCommentHandler,
  BulkDeleteCommentHandler,
];
