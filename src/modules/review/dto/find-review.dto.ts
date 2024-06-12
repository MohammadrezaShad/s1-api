import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ReviewEntity } from '@/modules/review/entity/review.entity';

@InputType()
export class FindReviewInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindManyReviewByPostInput {
  @Field(() => String)
  post: string;
}

@InputType()
export class FindManyReviewInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindReviewOutput extends CoreOutput {
  @Field(() => ReviewEntity, { nullable: true })
  result?: ReviewEntity;
}

@ObjectType()
export class FindManyReviewOutput extends CoreOutput {
  @Field(() => [ReviewEntity], { nullable: true })
  results?: ReviewEntity[];
}
