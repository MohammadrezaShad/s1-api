import { registerEnumType } from '@nestjs/graphql';

export enum CollectionName {
  IMAGE = 'image',
  USER = 'user',
  VISIT_STATISTICS = 'visitStatistics',
  TAXONOMY = 'taxonomy',
  VIDEO = 'video',
  PERMISSION = 'permission',
  ROLE = 'role',
  OTP = 'otp',
  BUSINESS = 'business',
  REVIEW = 'review',
  FAVORITE = 'favorite',
  BOOKMARK = 'bookmark',
  QUESTION = 'question',
  ANSWER = 'answer',
}

registerEnumType(CollectionName, {
  name: 'CollectionName',
});
