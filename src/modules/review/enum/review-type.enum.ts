import { registerEnumType } from '@nestjs/graphql';

export enum ReviewType {
  BUSINESS = 'business',
}

registerEnumType(ReviewType, {
  name: 'ReviewType',
});
