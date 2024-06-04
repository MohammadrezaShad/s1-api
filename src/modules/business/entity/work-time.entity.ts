import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ObjectType('DailyWorkTimeType')
@InputType()
export class DailyWorkTime {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  day?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  workTime?: string;
}
