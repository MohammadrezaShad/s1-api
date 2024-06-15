import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

@InputType('EditReviewInput')
export class EditReviewInput extends PartialType(
  PickType(ReviewEntity, ['content', 'score']),
) {
  @Field(() => String)
  id: string;
  user?: string;
}

@ObjectType('EditReviewOutput')
export class EditReviewOutput extends CoreOutput {}
