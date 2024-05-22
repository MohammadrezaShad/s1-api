import { BulkDeletebusinessUseCase } from './bulk-delete-business.use-case';
import { CreateBusinessUseCase } from './create-business.use-case';
import { DeleteBusinessUseCase } from './delete-business.use-case';
import { FindBusinessByIdUseCase } from './find-business-by-id.use-case';
import { FindBusinessByIdsUseCase } from './find-business-by-ids.use-case';
import { SearchBusinessUseCase } from './search-business.use-case';
import { UpdateBusinessUseCase } from './update-business.use-case';

export const BusinessUseCases = [
  CreateBusinessUseCase,
  UpdateBusinessUseCase,
  DeleteBusinessUseCase,
  BulkDeletebusinessUseCase,
  FindBusinessByIdUseCase,
  FindBusinessByIdsUseCase,
  SearchBusinessUseCase,
];
