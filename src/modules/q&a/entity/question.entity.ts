import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Schema } from '@/common/decorators/schema.decorator';
import { PostOutput } from '@/common/dtos/post-output.dto';
import { DefaultEntity } from '@/common/entities/default.entity';
import { BooleanEnum } from '@/common/enums/boolean.enum';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { UserOutput } from '@/modules/user/dto/user.output';
import { AnswerEntity } from '../answer/entity/answer.entity';

@InputType('QuestionEntityInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.QUESTION })
export class QuestionEntity extends DefaultEntity {
  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(3, 500, { message: 'Question content must be between' })
  content: string;

  @Prop({ type: String, required: true })
  @Field(() => PostOutput)
  @IsString()
  @IsNotEmpty()
  post: string;

  @Prop({ type: String, ref: 'UserEntity' })
  @Field(() => UserOutput, { nullable: true })
  @IsString()
  @IsOptional()
  user?: string;

  @Prop({ type: [String], required: true })
  @Field(() => [AnswerEntity])
  @IsString({ each: true })
  @IsOptional()
  answers?: string[];

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

export type TQuestionEntity = Document<QuestionEntity>;
export const QuestionEntitySchema = SchemaFactory(QuestionEntity);
