import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';

import { BooleanEnum } from '@/common/enums/boolean.enum';
import { AnswerEntity } from '../entity/answer.entity';

@InputType()
export class SearchAnswerInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  question?: string;

  @Field(() => BooleanEnum, { nullable: true })
  @IsOptional()
  @IsEnum(BooleanEnum)
  approved?: BooleanEnum;

  @Field(() => String, { nullable: true })
  @IsOptional()
  user?: string;
}

@ObjectType()
export class SearchAnswerOutput extends PaginationOutput {
  @Field(type => [AnswerEntity], { nullable: true })
  results?: AnswerEntity[];
}
