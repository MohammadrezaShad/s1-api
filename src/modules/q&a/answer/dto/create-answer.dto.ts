import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { AnswerEntity } from '../entity/answer.entity';

@InputType('CreateAnswerInput')
export class CreateAnswerInput extends PickType(AnswerEntity, [
  'content',
  'date',
]) {
  @Field(() => String)
  question: string;

  user: string;
}

@ObjectType('CreateAnswerOutput')
export class CreateAnswerOutput extends CoreOutput {}
