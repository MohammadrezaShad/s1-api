import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CommentEntity } from '../entity/comment.entity';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType('UpdateCommentInput')
export class UpdateCommentInput extends PartialType(
  PickType(CommentEntity, [
    'content',
    'authorEmail',
    'author',
    'parent',
    'approved',
    'createUser',
  ]),
) {
  @Field(() => String)
  commentId: string;

  user?: UserEntity;
  client?: string;
}

@ObjectType('UpdateCommentOutput')
export class UpdateCommentOutput extends CoreOutput {}
