import { BulkDeleteReviewHandler } from './bulk-delete-review/bulk-delete-review.handler';
import { CreateAdminReviewHandler } from './create-admin-review/create-review.handler';
import { CreateReviewHandler } from './create-review/create-review.handler';
import { DeleteReviewHandler } from './delete-review/delete-review.handler';
import { EditReviewHandler } from './edit-review/edit-review.handler';
import { RemoveReviewHandler } from './remove-review/remove-review.handler';
import { UpdateReviewHandler } from './update-review/update-review.handler';

export const ReviewCommandHandlers = [
  CreateReviewHandler,
  CreateAdminReviewHandler,
  UpdateReviewHandler,
  EditReviewHandler,
  DeleteReviewHandler,
  RemoveReviewHandler,
  BulkDeleteReviewHandler,
];
