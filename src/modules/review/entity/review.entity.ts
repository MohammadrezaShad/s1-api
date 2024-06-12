import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { Schema } from '@/common/decorators/schema.decorator';
import { PostOutput } from '@/common/dtos/post-output.dto';
import { DefaultEntity } from '@/common/entities/default.entity';
import { BooleanEnum } from '@/common/enums/boolean.enum';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { UserOutput } from '@/modules/user/dto/user.output';

import { ReviewType } from '../enum/review-type.enum';

@InputType('ReviewInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.REVIEW })
export class ReviewEntity extends DefaultEntity {
  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(3, 500, { message: 'Review content must be between' })
  content: string;

  @Prop({ type: String, required: true })
  @Field(() => PostOutput)
  @IsString()
  @IsNotEmpty()
  post: string;

  @Field(() => ReviewType)
  @Prop({
    type: String,
    required: true,
    enum: [...Object.values(ReviewType)],
    lowercase: true,
  })
  @IsEnum(ReviewType)
  type: ReviewType;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsString()
  @IsOptional()
  authorEmail?: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  author: string;

  @Prop({ type: String, ref: 'UserEntity' })
  @Field(() => UserOutput, { nullable: true })
  @IsString()
  @IsOptional()
  createUser?: string;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  parent?: string;

  @Prop({ type: Number, required: true })
  @Field(() => Number)
  @IsNumber({}, { message: 'Score must be number' })
  @IsNotEmpty({ message: 'Score can not be empty' })
  @Min(1, { message: 'Score must be between' })
  @Max(10, { message: 'Score must be between' })
  score: number;

  @Prop({
    type: String,
    enum: [...Object.values(BooleanEnum)],
    default: BooleanEnum.FALSE,
  })
  @Field(() => BooleanEnum, { nullable: true })
  @IsEnum(BooleanEnum)
  @IsOptional()
  approved?: BooleanEnum;
}

export type TReviewEntity = Document<ReviewEntity>;
export const ReviewEntitySchema = SchemaFactory(ReviewEntity);
