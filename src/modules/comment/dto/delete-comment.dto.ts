import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType('DeleteCommentInput')
export class DeleteCommentInput {
  @Field(() => String)
  commentId: string;
}

@InputType('RemoveCommentInput')
export class RemoveCommentInput {
  @Field(() => String)
  commentId: string;

  user?: string;
}

@InputType('DeleteCommentsInput')
export class DeleteCommentsInput {
  @Field(() => [String])
  commentIds: string[];
}

@ObjectType('DeleteCommentOutput')
export class DeleteCommentOutput extends CoreOutput {}
