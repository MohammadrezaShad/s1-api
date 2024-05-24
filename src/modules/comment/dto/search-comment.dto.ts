import { BusinessEntity } from '@/modules/business/entity/business.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { CommentType } from '../enum/comment-type.enum';
import { BooleanEnum } from '@/common/enums/boolean.enum';
import { CommentEntity } from '../entity/comment.entity';

@InputType()
export class SearchCommentInput extends PaginationInput {
  @Field(type => String, { nullable: true })
  post: string;

  @Field(type => CommentType, { nullable: true })
  @IsOptional()
  @IsEnum(CommentType)
  type?: CommentType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  authorEmail?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  author?: string;

  @Field(type => String, { nullable: true })
  parent?: string;

  @Field(() => BooleanEnum, { nullable: true })
  @IsOptional()
  @IsEnum(BooleanEnum)
  approved?: BooleanEnum;

  @Field(type => String, { nullable: true })
  user?: string;
}

@ObjectType()
export class SearchCommentOutput extends PaginationOutput {
  @Field(type => [CommentEntity], { nullable: true })
  results?: CommentEntity[];
}

@ObjectType('PostOutput')
export class PostOutput {
  @Field(type => BusinessEntity, { nullable: true })
  businessEntity?: BusinessEntity;
}
