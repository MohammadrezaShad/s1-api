import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { FavoriteEntity } from '@/modules/favorite/entity/favorite.entity';

@InputType()
export class CreateFavoriteInput extends OmitType(FavoriteEntity, [
  '_id',
  'createdAt',
  'updatedAt',
  'post',
  'user',
  'client',
] as const) {
  @Field(() => String)
  post: string;

  user: string;
  client: string;
}

@ObjectType()
export class CreateFavoriteOutput extends CoreOutput {}
