import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { ImageEntity } from '@/modules/image/entity/image.entity';

@InputType('BusinessInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.BUSINESS })
export class BusinessEntity extends DefaultEntity {
  @Field(() => String)
  @Prop({ type: String })
  @IsString()
  name: string;

  @Field(() => String)
  @Prop({ type: String })
  @IsString()
  slug: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('IR')
  phone?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  hoursOfWork?: string;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  long?: number;

  @Prop({ type: String, ref: 'Image' })
  @Field(() => ImageEntity, { nullable: true })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @Prop({ type: [String], ref: 'Image' })
  @Field(() => [ImageEntity], { nullable: true })
  @IsOptional()
  images?: string[];
}

type TBusiness = Document<BusinessEntity>;
const BusinessSchema = SchemaFactory(BusinessEntity);

BusinessSchema.index({ name: 'text' });
BusinessSchema.index({ name: 1 });

export { BusinessSchema, TBusiness };
