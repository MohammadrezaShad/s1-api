import { Injectable, OnModuleInit } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

import { Permission } from './common/permissions/permission-type';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    await this.createPermissions();
    await this.createCeoRole();
    await this.createRegularUserRole();
  }

  async createPermissions() {
    for (const key of Object.keys(Permission)) {
      const dbPermission = await this.permissionRepository.findByName(
        Permission[key].name,
      );
      if (!dbPermission) {
        await this.permissionRepository.directCreate({
          _id: new ObjectId(),
          name: Permission[key].name,
          title: Permission[key].title,
        });
      }
    }
  }

  async createCeoRole() {
    const allPermission = await this.permissionRepository.findAll();
    const permissionIds =
      allPermission?.map(({ _id }) => _id.toHexString()) || [];

    const ceoRole = await this.roleRepository.findByName('CEO');

    if (!ceoRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: 'CEO',
        title: 'مدیر ارشد',
        permissions: permissionIds,
      });
    } else {
      if (permissionIds.length != ceoRole.getPermissions().length) {
        this.roleRepository.update({
          roleId: ceoRole.getId(),
          permissions: permissionIds,
        });
      }
    }
  }

  async createRegularUserRole() {
    const userRole = await this.roleRepository.findByName('REGULAR_USER');
    const regularUserPermission =
      await this.permissionRepository.findByName('regularUser');
    if (!userRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: 'REGULAR_USER',
        title: 'کاربر ساده',
        permissions: [regularUserPermission.getId()],
      });
    }
  }
}
