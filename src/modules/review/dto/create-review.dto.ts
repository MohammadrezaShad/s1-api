import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ReviewEntity } from '@/modules/review/entity/review.entity';
import { IsOptional } from 'class-validator';

@InputType('CreateReviewInput')
export class CreateReviewInput extends PickType(ReviewEntity, [
  'content',
  'author',
  'authorEmail',
  'parent',
  'type',
  'score',
]) {
  @Field(() => String)
  post: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  image?: string | null;

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

  @Field(() => String, { nullable: true })
  @IsOptional()
  image?: string | null;

  user: string;
}

@ObjectType('CreateReviewOutput')
export class CreateReviewOutput extends CoreOutput {}
