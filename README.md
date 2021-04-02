# React Admin Access Control Lists (RA-ACL)

React Admin permission management made easy. This library is heavily inspired by [ra-auth-acl](https://github.com/marmelab/ra-auth-acl) and takes things much further.

RA-ACL aims to perform two jobs:
- Making managing role-based permissions a breeze
- Providing declarative components to keep your code clean

## Getting Start

Install with `yarn add ra-access-control-lists`

You'll need to create your own permissions object with the following structure

```typescript
const permissions = {
  [role1]: {
    [resource1]: {
      [permission1]: boolean;
      [permission2]: boolean;
    },
    [resource2]: {
      [permission1]: boolean;
      [permission2]: boolean;
    }
  },
  [role2]: {
    [resource1]: {
      [permission1]: boolean;
      [permission2]: boolean;
    },
    [resource2]: {
      [permission1]: boolean;
      [permission2]: boolean;
    } 
  }
}
```

You'll then need to add the following to your `authProvider.ts`

```typescript
import permissions from './permissions';

const authProvider = {
  // other methods
  getPermissions: () => {
    // this should be saved to local storage during login()
    const role = localStorage.getItem('role');

    const userPermissions = permissions[role];

    return Promise.resolve(userPermissions)
  }
}
```

The above is necessary to get the `useACL` hook working since it uses `usePermissions` under the hood.

With that out of the way, you're able to start using RA-ACL!
