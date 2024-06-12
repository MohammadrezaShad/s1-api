import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

@InputType('UpdateReviewInput')
export class UpdateReviewInput extends PartialType(
  PickType(ReviewEntity, [
    'content',
    'authorEmail',
    'author',
    'parent',
    'approved',
    'createUser',
  ]),
) {
  @Field(() => String)
  id: string;

  user?: string;
}

@ObjectType('UpdateReviewOutput')
export class UpdateReviewOutput extends CoreOutput {}
