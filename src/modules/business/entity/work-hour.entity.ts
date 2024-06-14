import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType('TimeRangeType')
@InputType()
export class TimeRange {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  from?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  to?: string;
}

@ObjectType('WorkHourType')
@InputType()
export class WorkHour {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  day?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  open24Hours?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  closed?: boolean;

  @Field(() => [TimeRange], { nullable: true })
  @IsOptional()
  timeRanges?: TimeRange[];
}
