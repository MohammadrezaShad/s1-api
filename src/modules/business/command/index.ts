import { BulkDeleteBusinessHandler } from './bulk-delete-business/bulk-delete-business.handler';
import { CreateBusinessHandler } from './create-business/create-business.handler';
import { DeleteBusinessHandler } from './delete-business/delete-business.handler';
import { UpdateBusinessHandler } from './update-business/update-business.handler';

export const BusinessCommandHandlers = [
  CreateBusinessHandler,
  DeleteBusinessHandler,
  UpdateBusinessHandler,
  BulkDeleteBusinessHandler,
];
