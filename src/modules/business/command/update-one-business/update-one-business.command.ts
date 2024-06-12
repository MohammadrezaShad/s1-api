import { UpdateBusinessInput } from '../../dto/update-business.dto';

export class UpdateOneBusinessCommand {
  constructor(public readonly updatebusinessInput: UpdateBusinessInput) {}
}
