import { DeleteBusinessInput } from '../../dto/delete-business.dto';

export class DeleteOneBusinessCommand {
  constructor(public readonly deleteBusinessInput: DeleteBusinessInput) {}
}
