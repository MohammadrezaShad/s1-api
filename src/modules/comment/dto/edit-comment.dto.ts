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

@InputType('EditCommentInput')
export class EditCommentInput extends PartialType(
  PickType(CommentEntity, ['content']),
) {
  @Field(() => String)
  commentId: string;
  user?: string;
}

@ObjectType('EditCommentOutput')
export class EditCommentOutput extends CoreOutput {}
