import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReviewType } from '../enum/review-type.enum';

@ObjectType()
export class VotesDetailOutput extends CoreOutput {
  @IsArray()
  @Field(() => [VotesDetail], { nullable: true })
  votesDetail: VotesDetail[];
}

@ObjectType()
export class VotesDetail {
  @IsString()
  @Field(() => String, { nullable: true })
  post: string;
  @IsNumber()
  @Field(() => Number, { nullable: true })
  totalVotesCount: number;
  @IsArray()
  @Field(() => [Score], { nullable: true })
  scoreGroup: Score[];
}

@ObjectType()
export class Score {
  @IsNumber()
  @Field(() => Number, { nullable: true })
  score: number;
  @IsNumber()
  @Field(() => Number, { nullable: true })
  votesCount: number;
  @IsNumber()
  @Field(() => Number, { nullable: true })
  percent: number;
}

@InputType()
export class GetVotesDetailInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  post?: string;

  @Field(() => ReviewType, { nullable: true })
  @IsOptional()
  @IsEnum(ReviewType)
  type?: ReviewType;
}
