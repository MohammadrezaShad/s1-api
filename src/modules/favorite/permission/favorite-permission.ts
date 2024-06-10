import { PermissionType } from '@/common/permissions/permission-type';

export class FavoritePermission {
  static readonly CREATE_FAVORITE: PermissionType = {
    name: 'createَFavorite',
    title: 'ایجاد نشان شده ها',
  };

  static readonly UPDATE_FAVORITE: PermissionType = {
    name: 'updateFavorite',
    title: 'آپدیت نشان شده ها',
  };

  static readonly DELETE_FAVORITE: PermissionType = {
    name: 'deleteFavorite',
    title: 'حذف نشان شده ها',
  };

  static readonly BULK_DELETE_FAVORITE: PermissionType = {
    name: 'bulkDeleteFavorite',
    title: 'حذف چندتایی علاقه مندی',
  };
}
