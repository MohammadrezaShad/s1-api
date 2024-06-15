import { ReviewType } from '../../enum/review-type.enum';

export class GetPostScoreByUserQuery {
  constructor(
    readonly user: string,
    readonly post: string,
    readonly type: ReviewType,
  ) {}
}
