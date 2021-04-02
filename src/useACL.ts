import { usePermissions } from 'ra-core';
import { hasAccess } from './hasAccess';

/**
 * Get the current user's permissions for a given resource
 *
 * Note: When adding a new resource to the permissions object, try to name the resource as it exists in the SAPI
 *
 * If possible, try not to use this hook directly in your `Show`, `Edit`, etc components. Instead make a reusable component
 * like that renders based on the user's permission. Examples of this are `FieldWithPermission` and `ResourceWithPermission`
 *
 * The ACL is inspired by the principles of Least Privilege. If a resource is defined in the ACL object then all of permissions are `false` unless explicitly set to true
 *
 * e.g.
 *
 * const permissions = {
 *   adminAppointments: {
 *     create: true,
 *   },
 * };
 *
 * will have all of its other permissions set to `false`
 */

export function useACL(resourceName: string) {
  const { permissions } = usePermissions();

  const access = {
    enabled: hasAccess(permissions, `${resourceName}.enabled`),
    list: hasAccess(permissions, `${resourceName}.list`),
    create: hasAccess(permissions, `${resourceName}.create`),
    edit: hasAccess(permissions, `${resourceName}.edit`),
    show: hasAccess(permissions, `${resourceName}.show`),
  };

  return access;
}
