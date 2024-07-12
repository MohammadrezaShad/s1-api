import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { BusinessEntity } from '../entity/business.entity';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { BusinessStatus } from '../enum/status.enum';

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

  @Field(() => String, { nullable: true })
  @IsObjectId()
  @IsOptional()
  ninId?: string;

  @Field(() => BusinessStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BusinessStatus)
  status?: BusinessStatus;
}

@ObjectType('SearchBusinessOutput')
export class SearchBusinessOutput extends PaginationOutput {
  @Field(() => [BusinessEntity], { nullable: true })
  results?: BusinessEntity[];
}
