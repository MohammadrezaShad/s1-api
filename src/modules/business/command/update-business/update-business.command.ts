import { UpdateBusinessInput } from '../../dto/update-business.dto';

export class UpdateBusinessCommand {
  constructor(public readonly updatebusinessInput: UpdateBusinessInput) {}
}
