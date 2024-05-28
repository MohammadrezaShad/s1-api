import { PermissionType } from '@/common/permissions/permission-type';

export class FavoritePermission {
  static readonly BULK_DELETE_FAVORITE: PermissionType = {
    name: 'bulkDeleteFavorite',
    title: 'حذف چندتایی علاقه مندی',
  };
}
