import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType('DeleteReviewInput')
export class DeleteReviewInput {
  @Field(() => String)
  id: string;
}

@InputType('RemoveReviewInput')
export class RemoveReviewInput {
  @Field(() => String)
  id: string;

  user?: string;
}

@InputType('DeleteManyReviewInput')
export class DeleteManyReviewInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType('DeleteReviewOutput')
export class DeleteReviewOutput extends CoreOutput {}
