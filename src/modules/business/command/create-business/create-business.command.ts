import { CreateBusinessInput } from '../../dto/create-business.dto';

export class CreateBusinessCommand {
  constructor(public readonly createBusinessInput: CreateBusinessInput) {}
}
