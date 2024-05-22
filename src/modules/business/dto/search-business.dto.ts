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
}

@ObjectType('SearchBusinessOutput')
export class SearchBusinessOutput extends PaginationOutput {
  @Field(() => [BusinessEntity], { nullable: true })
  results?: BusinessEntity[];
}
