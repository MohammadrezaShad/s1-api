import { GetVotesDetailInput } from '../../dto/votes-detail.dto';

export class GetVotesDetailQuery {
  constructor(readonly getVotesDetailInput: GetVotesDetailInput) {}
}
