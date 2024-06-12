import { DeleteOneBusinessHandler } from '@/modules/business/command/delete-one-business/delete-one-business.handler';
import { UpdateOneBusinessHandler } from '@/modules/business/command/update-one-business/update-one-business.handler';

import { BulkDeleteBusinessHandler } from './bulk-delete-business/bulk-delete-business.handler';
import { CreateBusinessHandler } from './create-business/create-business.handler';
import { DeleteBusinessHandler } from './delete-business/delete-business.handler';
import { UpdateBusinessHandler } from './update-business/update-business.handler';

export const BusinessCommandHandlers = [
  CreateBusinessHandler,
  DeleteBusinessHandler,
  DeleteOneBusinessHandler,
  UpdateBusinessHandler,
  UpdateOneBusinessHandler,
  BulkDeleteBusinessHandler,
];
