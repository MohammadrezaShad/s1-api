import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Schema } from '@/common/decorators/schema.decorator';
import { PostOutput } from '@/common/dtos/post-output.dto';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { UserOutput } from '@/modules/user/dto/user.output';

@InputType('FavoriteInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.FAVORITE })
export class FavoriteEntity extends DefaultEntity {
  @Prop({ type: String, required: true })
  @Field(() => PostOutput)
  @IsString()
  @IsNotEmpty()
  post: string;

  @Prop({ type: String, ref: 'User' })
  @Field(() => UserOutput, { nullable: true })
  @IsString()
  @IsOptional()
  user?: string;

  @Prop({
    type: String,
    enum: [...Object.values(CollectionName)],
  })
  @Field(() => CollectionName)
  @IsEnum(CollectionName)
  type: CollectionName;
}

type TFavorite = Document<FavoriteEntity>;
const FavoriteSchema = SchemaFactory(FavoriteEntity);

export { FavoriteSchema, TFavorite };
