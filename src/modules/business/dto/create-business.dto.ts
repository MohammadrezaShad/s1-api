import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

import { BusinessEntity } from '../entity/business.entity';

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
  'hoursOfWork',
  'lat',
  'long',
] as const) {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  taxonomies?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  thumbnail?: string | null;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  images?: string[];
}

@ObjectType()
export class CreateBusinessOutput extends CoreOutput {}
