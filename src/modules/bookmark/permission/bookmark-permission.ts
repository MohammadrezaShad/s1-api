import { PermissionType } from '@/common/permissions/permission-type';

export class BookmarkPermission {
  static readonly BULK_DELETE_BOOKMARK: PermissionType = {
    name: 'bulkDeleteBookmark',
    title: 'حذف چندتایی نشان شده ها',
  };
}
