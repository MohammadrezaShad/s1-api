import { DeleteBusinessInput } from '../../dto/delete-business.dto';

export class DeleteBusinessCommand {
  constructor(public readonly deleteBusinessInput: DeleteBusinessInput) {}
}
