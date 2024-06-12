import { FindCommentByPostUseCase } from '@/modules/comment/use-case/find-comment-by-post.use-case';

import { BulkDeleteCommentUseCase } from './bulk-delete-comment.use-case';
import { CreateAdminCommentUseCase } from './create-admin-comment.use-case';
import { CreateCommentUseCase } from './create-comment.use-case';
import { DeleteCommentUseCase } from './delete-comment.use-case';
import { EditCommentUseCase } from './edit-comment.use-case';
import { FindCommentByIdUseCase } from './find-comment-by-id.use-case';
import { FindCommentByIdsUseCase } from './find-comment-by-ids.use-case';
import { RemoveCommentUseCase } from './remove-comment.use-case';
import { SearchCommentUseCase } from './search-comment.use-case';
import { UpdateCommentUseCase } from './update-comment.use-case';

export const CommentUseCases = [
  CreateCommentUseCase,
  CreateAdminCommentUseCase,
  UpdateCommentUseCase,
  EditCommentUseCase,
  DeleteCommentUseCase,
  RemoveCommentUseCase,
  BulkDeleteCommentUseCase,
  FindCommentByIdUseCase,
  FindCommentByIdsUseCase,
  FindCommentByPostUseCase,
  SearchCommentUseCase,
];
