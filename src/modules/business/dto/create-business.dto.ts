import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

import { BusinessEntity } from '../entity/business.entity';
import { WorkHour } from '../entity/work-hour.entity';

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
  'amenities',
  'status',
] as const) {
  @Field(() => [WorkHour], { nullable: true })
  @IsOptional()
  workHour?: WorkHour[];

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
export class CreateBusinessOutput extends CoreOutput {
  @Field(() => String)
  businessId: string;
}
