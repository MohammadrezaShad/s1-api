import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

import { CommentEntity } from '../entity/comment.entity';

@InputType()
export class FindCommentInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindCommentsByPostInput {
  @Field(() => String)
  post: string;
}

@InputType()
export class FindCommentsInput {
  @Field(() => [String])
  commentIds: string[];
}

@ObjectType()
export class FindCommentOutput extends CoreOutput {
  @Field(() => CommentEntity, { nullable: true })
  result?: CommentEntity;
}

@ObjectType()
export class FindCommentsOutput extends CoreOutput {
  @Field(() => [CommentEntity], { nullable: true })
  results?: CommentEntity[];
}
