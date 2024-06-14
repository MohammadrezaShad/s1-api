import { ReviewType } from '../../enum/review-type.enum';

export class GetPostScoreQuery {
  constructor(
    readonly post: string,
    readonly type: ReviewType,
  ) {}
}
