import { FindReviewByIdsUseCase } from '@/modules/review/use-case/find-review-by-ids.use-case';
import { FindReviewByPostUseCase } from '@/modules/review/use-case/find-review-by-post.use-case';

import { BulkDeleteReviewUseCase } from './bulk-delete-review.use-case';
import { CreateAdminReviewUseCase } from './create-admin-review.use-case';
import { CreateReviewUseCase } from './create-review.use-case';
import { DeleteReviewUseCase } from './delete-review.use-case';
import { EditReviewUseCase } from './edit-review.use-case';
import { FindReviewByIdUseCase } from './find-review-by-id.use-case';
import { RemoveReviewUseCase } from './remove-review.use-case';
import { SearchReviewUseCase } from './search-review.use-case';
import { UpdateReviewUseCase } from './update-review.use-case';
import { GetVotesDetailUseCase } from './get-votes-detail.use-case';

export const ReviewUseCases = [
  CreateReviewUseCase,
  CreateAdminReviewUseCase,
  UpdateReviewUseCase,
  EditReviewUseCase,
  DeleteReviewUseCase,
  RemoveReviewUseCase,
  BulkDeleteReviewUseCase,
  FindReviewByIdUseCase,
  FindReviewByIdsUseCase,
  FindReviewByPostUseCase,
  SearchReviewUseCase,
  GetVotesDetailUseCase,
];
