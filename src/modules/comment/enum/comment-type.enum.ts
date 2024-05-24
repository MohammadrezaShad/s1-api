import { registerEnumType } from '@nestjs/graphql';

export enum CommentType {
  BUSINESS = 'business',
}

registerEnumType(CommentType, {
  name: 'CommentType',
});
