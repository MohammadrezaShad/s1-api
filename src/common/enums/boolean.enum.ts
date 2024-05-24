import { registerEnumType } from '@nestjs/graphql';
export enum BooleanEnum {
  TRUE = '1',
  FALSE = '0',
}

registerEnumType(BooleanEnum, {
  name: 'BooleanEnum',
});
