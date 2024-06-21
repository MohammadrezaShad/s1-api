import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType('DeleteQuestionInput')
export class DeleteQuestionInput {
  @Field(() => String)
  id: string;
}

@InputType('DeleteQuestionsInput')
export class DeleteQuestionsInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType('DeleteQuestionOutput')
export class DeleteQuestionOutput extends CoreOutput {}
