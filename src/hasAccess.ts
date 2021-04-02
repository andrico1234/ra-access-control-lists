import get from 'lodash.get';
import { usePermissions } from 'ra-core';

type Permissions = ReturnType<typeof usePermissions>;

export const hasAccess = (
  permissions: Permissions,
  ...askedPermissions: string[]
) => {
  return askedPermissions.every(permission =>
    get(permissions, permission, false)
  );
};
