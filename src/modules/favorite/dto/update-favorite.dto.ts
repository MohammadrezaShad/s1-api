import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateFavoriteInput } from '@/modules/favorite/dto/create-favorite.dto';

@InputType()
export class UpdateFavoriteInput extends PartialType(CreateFavoriteInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UpdateFavoriteOutput extends CoreOutput {}
