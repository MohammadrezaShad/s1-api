import { PermissionType } from '@/common/permissions/permission-type';

export class BookmarkPermission {
  static readonly CREATE_BOOKMARK: PermissionType = {
    name: 'createَBookmark',
    title: 'ایجاد نشان شده ها',
  };

  static readonly UPDATE_BOOKMARK: PermissionType = {
    name: 'updateBookmark',
    title: 'آپدیت نشان شده ها',
  };

  static readonly DELETE_BOOKMARK: PermissionType = {
    name: 'deleteBookmark',
    title: 'حذف نشان شده ها',
  };

  static readonly BULK_DELETE_BOOKMARK: PermissionType = {
    name: 'bulkDeleteBookmark',
    title: 'حذف چندتایی نشان شده ها',
  };
}
