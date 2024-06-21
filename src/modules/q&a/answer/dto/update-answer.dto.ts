import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateAnswerInput } from './create-answer.dto';

@InputType('UpdateAnswerInput')
export class UpdateAnswerInput extends PartialType(CreateAnswerInput) {
  @Field(() => String)
  id: string;
  user?: string;
}

@ObjectType('UpdateAnswerOutput')
export class UpdateAnswerOutput extends CoreOutput {}
