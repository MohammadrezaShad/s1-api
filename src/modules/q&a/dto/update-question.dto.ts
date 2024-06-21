import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateQuestionInput } from './create-question.dto';

@InputType('UpdateQuestionInput')
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  approved?: boolean;

  answers?: string;

  user?: string;
}

@ObjectType('UpdateQuestionOutput')
export class UpdateQuestionOutput extends CoreOutput {}
