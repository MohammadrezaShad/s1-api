import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType('ReviewRateDetailType')
export class ReviewRateDetail {
  _id: number;

  @Field(() => Number, { nullable: true })
  @IsString()
  @IsOptional()
  ratingValue: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  ratingCount: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  bestRating: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  worstRating: number;
}
