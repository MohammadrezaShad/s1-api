import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

@InputType('CreateReviewInput')
export class CreateReviewInput extends PickType(ReviewEntity, [
  'content',
  'author',
  'authorEmail',
  'parent',
  'type',
]) {
  @Field(() => String)
  post: string;

  user: string;
}

@InputType('CreateAdminReviewInput')
export class CreateAdminReviewInput extends PickType(ReviewEntity, [
  'content',
  'parent',
  'type',
]) {
  @Field(() => String)
  post: string;

  user: string;
}

@ObjectType('CreateReviewOutput')
export class CreateReviewOutput extends CoreOutput {}
