import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

import { CommentEntity } from '../entity/comment.entity';

@InputType('CreateCommentInput')
export class CreateCommentInput extends PickType(CommentEntity, [
  'content',
  'author',
  'authorEmail',
  'parent',
  'type',
]) {
  @Field(() => String)
  post: string;

  user: string;

  client: string;
}

@InputType('CreateAdminCommentInput')
export class CreateAdminCommentInput extends PickType(CommentEntity, [
  'content',
  'parent',
  'type',
]) {
  @Field(() => String)
  post: string;

  user: string;
}

@ObjectType('CreateCommentOutput')
export class CreateCommentOutput extends CoreOutput {}
