import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { QuestionEntity } from '../entity/question.entity';

@InputType()
export class FindQuestionInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindQuestionsByPostInput {
  @Field(() => String)
  post: string;
}

@InputType()
export class FindQuestionsInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindQuestionOutput extends CoreOutput {
  @Field(() => QuestionEntity, { nullable: true })
  result?: QuestionEntity;
}

@ObjectType()
export class FindQuestionsOutput extends CoreOutput {
  @Field(() => [QuestionEntity], { nullable: true })
  results?: QuestionEntity[];
}
