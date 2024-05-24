import { ObjectType } from '@nestjs/graphql';

@ObjectType('CommentQuery')
export class CommentQuery {}

@ObjectType('MutateCommentResponse')
export class MutateCommentResponse {}
