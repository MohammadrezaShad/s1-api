import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

import { QuestionEntity } from '../entity/question.entity';

@InputType('CreateQuestionInput')
export class CreateQuestionInput extends PickType(QuestionEntity, ['content']) {
  @Field(() => String)
  business: string;

  user: string;
}

@ObjectType('CreateQuestionOutput')
export class CreateQuestionOutput extends CoreOutput {}
