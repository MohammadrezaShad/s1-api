import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';

import { BooleanEnum } from '@/common/enums/boolean.enum';
import { QuestionEntity } from '../entity/question.entity';

@InputType()
export class SearchQuestionInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  post: string;

  @Field(() => BooleanEnum, { nullable: true })
  @IsOptional()
  @IsEnum(BooleanEnum)
  approved?: BooleanEnum;

  @Field(() => String, { nullable: true })
  user?: string;
}

@ObjectType()
export class SearchQuestionOutput extends PaginationOutput {
  @Field(() => [QuestionEntity], { nullable: true })
  results?: QuestionEntity[];
}
