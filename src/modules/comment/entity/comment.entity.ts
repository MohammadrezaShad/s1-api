import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { PostOutput } from '../dto/search-comment.dto';
import { CommentType } from '../enum/comment-type.enum';
import { BooleanEnum } from '@/common/enums/boolean.enum';
import { UserOutput } from '@/modules/user/dto/user.output';

@InputType('CommentInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.COMMENT })
export class CommentEntity extends DefaultEntity {
  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(3, 500, { message: 'comments content must be between' })
  content: string;

  @Prop({ type: String, required: true })
  @Field(() => PostOutput)
  @IsString()
  @IsNotEmpty()
  post: string;

  @Field(type => CommentType)
  @Prop({
    type: String,
    required: true,
    enum: [...Object.values(CommentType)],
    lowercase: true,
  })
  @IsEnum(CommentType)
  type: CommentType;

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

  @Prop({ type: String, ref: 'User' })
  @Field(() => UserOutput, { nullable: true })
  @IsString()
  @IsOptional()
  createUser?: string;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  parent?: string;

  @Prop({
    type: String,
    enum: [...Object.values(BooleanEnum)],
    default: BooleanEnum.FALSE,
  })
  @Field(() => BooleanEnum, { nullable: true })
  @IsEnum(BooleanEnum)
  @IsOptional()
  approved?: BooleanEnum;

  @Prop({ type: String, nullable: false })
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  client?: string;
}

export type TCommentEntity = Document<CommentEntity>;
export const CommentEntitySchema = SchemaFactory(CommentEntity);
