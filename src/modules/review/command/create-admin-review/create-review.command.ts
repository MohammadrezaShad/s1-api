import { CreateAdminReviewInput } from '../../dto/create-review.dto';

export class CreateAdminReviewCommand {
  constructor(public readonly createAdminReviewInput: CreateAdminReviewInput) {}
}
