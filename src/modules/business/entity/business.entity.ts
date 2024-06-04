import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { ImageEntity } from '@/modules/image/entity/image.entity';
import { TaxonomyEntity } from '@/modules/taxonomy/entity/taxonomy.entity';
import { DailyWorkTime } from './work-time.entity';

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
  address2?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  webAddress?: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, nullable: true })
  @Field(() => [DailyWorkTime], { nullable: true })
  @IsOptional()
  dailyWorkTime?: DailyWorkTime[];

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

  @Prop({ type: [String], ref: 'taxonomy' })
  @Field(() => [TaxonomyEntity], { nullable: true })
  @IsOptional()
  taxonomies?: string[];

  @Prop({ type: String, ref: 'image' })
  @Field(() => ImageEntity, { nullable: true })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @Prop({ type: [String], ref: 'image' })
  @Field(() => [ImageEntity], { nullable: true })
  @IsOptional()
  images?: string[];
}

type TBusiness = Document<BusinessEntity>;
const BusinessSchema = SchemaFactory(BusinessEntity);

BusinessSchema.index({ name: 'text' });
BusinessSchema.index({ name: 1 });

export { BusinessSchema, TBusiness };
