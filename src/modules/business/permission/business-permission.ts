import { PermissionType } from '@/common/permissions/permission-type';

export class BusinessPermission {
  static readonly CREATE_BUSINESS: PermissionType = {
    name: 'createBusiness',
    title: 'ایجاد بیزینس',
  };

  static readonly UPDATE_BUSINESS: PermissionType = {
    name: 'updateBusiness',
    title: 'آپدیت بیزینس',
  };

  static readonly DELETE_BUSINESS: PermissionType = {
    name: 'deleteBusiness',
    title: 'حذف بیزینس',
  };

  static readonly BULK_DELETE_BUSINESS: PermissionType = {
    name: 'bulkDeleteBusiness',
    title: 'حذف چندتایی بیزینس',
  };
}
