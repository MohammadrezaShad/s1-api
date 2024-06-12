import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';

import { BooleanEnum } from '@/common/enums/boolean.enum';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

import { ReviewType } from '../enum/review-type.enum';

@InputType()
export class SearchReviewInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  post: string;

  @Field(() => ReviewType, { nullable: true })
  @IsOptional()
  @IsEnum(ReviewType)
  type?: ReviewType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  authorEmail?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  author?: string;

  @Field(() => String, { nullable: true })
  parent?: string;

  @Field(() => BooleanEnum, { nullable: true })
  @IsOptional()
  @IsEnum(BooleanEnum)
  approved?: BooleanEnum;

  @Field(() => String, { nullable: true })
  user?: string;
}

@ObjectType()
export class SearchReviewOutput extends PaginationOutput {
  @Field(type => [ReviewEntity], { nullable: true })
  results?: ReviewEntity[];
}
