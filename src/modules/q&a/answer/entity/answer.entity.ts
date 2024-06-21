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
import { DefaultEntity } from '@/common/entities/default.entity';
import { BooleanEnum } from '@/common/enums/boolean.enum';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { UserOutput } from '@/modules/user/dto/user.output';

import { IsCorrectDate } from '@/common/decorators/date-validation-decorator';
import { QuestionEntity } from '../../entity/question.entity';

@InputType('AnswerEntityInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.ANSWER })
export class AnswerEntity extends DefaultEntity {
  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(3, 500, { message: 'Answer content must be between' })
  content: string;

  @Prop({ type: String, ref: 'QuestionEntity' })
  @Field(() => QuestionEntity)
  @IsString()
  question: string;

  @Prop({ type: Date })
  @Field(() => String, { nullable: true })
  @IsString({ message: 'date must be string' })
  @IsCorrectDate({ message: 'date format is wrong' })
  @IsOptional()
  date?: string;

  @Prop({ type: String, ref: 'UserEntity' })
  @Field(() => UserOutput, { nullable: true })
  @IsString()
  @IsOptional()
  user?: string;

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

export type TAnswerEntity = Document<AnswerEntity>;
export const AnswerEntitySchema = SchemaFactory(AnswerEntity);
