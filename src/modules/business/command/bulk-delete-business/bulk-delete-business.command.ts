import { BulkDeleteBusinessInput } from '../../dto/delete-business.dto';

export class BulkDeleteBusinessCommand {
  constructor(
    public readonly bulkDeleteBusinessInput: BulkDeleteBusinessInput,
  ) {}
}
