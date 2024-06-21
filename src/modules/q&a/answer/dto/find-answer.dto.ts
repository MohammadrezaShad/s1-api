import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { AnswerEntity } from '../entity/answer.entity';

@InputType()
export class FindAnswerInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindManyAnswerByQuestionInput {
  @Field(() => String)
  question: string;
}

@InputType()
export class FindManyAnswerInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindAnswerOutput extends CoreOutput {
  @Field(() => AnswerEntity, { nullable: true })
  result?: AnswerEntity;
}

@ObjectType()
export class FindManyAnswerOutput extends CoreOutput {
  @Field(() => [AnswerEntity], { nullable: true })
  results?: AnswerEntity[];
}
