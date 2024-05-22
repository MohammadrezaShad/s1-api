import { BadRequestException, Injectable } from '@nestjs/common';

import {
  PERMISSION_ID_IS_NOT_CORRECT,
  PERMISSION_NAME_DUPLICATED,
  PERMISSION_TITLE_DUPLICATED,
} from '@/modules/auth/components/permission/constant/error-message.constant';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';

@Injectable()
export class PermissionHelepr {
  constructor(private readonly repository: PermissionRepository) {}

  async validatePermissionId(permId: string) {
    const business = await this.repository.findById({ id: permId });
    if (!business || business === null)
      throw new BadRequestException(PERMISSION_ID_IS_NOT_CORRECT);
  }

  async validatePermissionName(name: string, permId: string | null) {
    const business = await this.repository.findOneItemByName(name, permId);
    if (business) throw new BadRequestException(PERMISSION_NAME_DUPLICATED);
  }

  async validatePermissionTitle(title: string, permId: string | null) {
    const business = await this.repository.findOneItemByTitle(title, permId);
    if (business) throw new BadRequestException(PERMISSION_TITLE_DUPLICATED);
  }
}
