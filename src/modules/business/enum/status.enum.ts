import { registerEnumType } from '@nestjs/graphql';

export enum BusinessStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

registerEnumType(BusinessStatus, {
  name: 'BusinessStatus',
});
