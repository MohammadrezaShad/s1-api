import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType('DeleteAnswerInput')
export class DeleteAnswerInput {
  @Field(() => String)
  id: string;
}

@InputType('DeleteManyAnswerInput')
export class DeleteManyAnswerInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType('DeleteAnswerOutput')
export class DeleteAnswerOutput extends CoreOutput {}
