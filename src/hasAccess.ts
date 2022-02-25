import get from 'lodash.get';

interface Permissions {
  loading: boolean;
  loaded: boolean;
  permissions?: any;
  error?: any;
}

export const hasAccess = (
  permissions: Permissions,
  ...askedPermissions: string[]
) => {
  return askedPermissions.every(permission =>
    get(permissions, permission, false)
  );
};
