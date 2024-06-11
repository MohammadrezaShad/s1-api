import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

import { BusinessEntity } from '../entity/business.entity';
import { DailyWorkTime } from '../entity/work-time.entity';

@InputType()
export class CreateBusinessInput extends PickType(BusinessEntity, [
  'name',
  'slug',
  'email',
  'phone',
  'address',
  'address2',
  'description',
  'webAddress',
  'lat',
  'long',
] as const) {
  @Field(() => [DailyWorkTime], { nullable: true })
  @IsOptional()
  dailyWorkTime?: DailyWorkTime[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  taxonomies?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  thumbnail?: string | null;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  images?: string[];

  user?: string;
}

@ObjectType()
export class CreateBusinessOutput extends CoreOutput {}
