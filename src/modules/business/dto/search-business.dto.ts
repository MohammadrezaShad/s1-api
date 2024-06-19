import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { BusinessEntity } from '../entity/business.entity';

@InputType('SearchBusinessInput')
export class SearchBusinessInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  user?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  taxonomies?: string[];
}

@ObjectType('SearchBusinessOutput')
export class SearchBusinessOutput extends PaginationOutput {
  @Field(() => [BusinessEntity], { nullable: true })
  results?: BusinessEntity[];
}
