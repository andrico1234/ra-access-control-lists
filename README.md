# React Admin Access Control Lists (RA-ACL)

## Introduction

React Admin permission management made easy. This library is heavily inspired by [ra-auth-acl](https://github.com/marmelab/ra-auth-acl).

RA-ACL aims to perform two jobs:
- Making managing role-based permissions a breeze
- Providing declarative components to keep your code clean/maintanable

## Getting Started

### Initial Set up

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

    const rolePermissions = permissions[role];

    return Promise.resolve(rolePermissions)
  }
}
```

The above is necessary to get the `useACL` hook working since it uses `usePermissions` under the hood.

With that out of the way, you're able to start using RA-ACL!

### Using RA-ACL

RA-ACL exports a handy `useACL` function, as well as a handful of declarative components that do all the heavy lifting

#### useACL

Scenario: You have a `Posts` resource. Both a *user* and *admin* can *view* a *post*, but only an *admin* can *edit* a *post*.

In this scenario:

- *user* and *admin* are the roles
- *post* is the resource
- *view* and *edit* are permissions.

With this information our `permissions` object will look like this:

```typescript
const permissions = {
  user: {
    post: {
      view: true,
      edit: false,
    }
  },
  admin: {
    post: {
      view: true,
      edit: true,
    }
  }
}
```

In this scenario, we'll want to hide/show the `edit` button in the post's action bar based on the user's permission.

The `ShowPost` component will look like this:

```tsx
import { Actions } from './Actions';
import { Show } from 'react-admin';

export function PostShow() {
  return (
    <Show {...props} actions={<Actions />}>
      {/* Your Show fields */}
    </Show>
  )
}
```

and your `Action` component will look like this:

```tsx
import { useACL } from 'ra-acl';

export function Actions({
  resource = '',
  basePath,
  data,
}) {
  const { edit: canEdit } = useACL(resource);
  
  return (
    <TopToolbar>
      {canEdit && <EditButton basePath={basePath} record={data} />}
    </TopToolbar>
  )
}
```

If you're logged in as an admin, they'll the edit button no-problemo. If you're logged in as a user, you should not see the edit button. Why run the example to see this in action?

### WithPermission Components

RA-ACL also exports a handful of out-of-the-box components that handle the `useACL` logic. 

These are:
- `FieldWithPermission`
- `ResourceWithPermission`
- `TabWithPermission`

#### FieldWithPermission

A generic wrapper over any field component, that will hide/show that field based on the specified resource and permission.

Scenario: You have a date field that you only want to display to people with `post` `edit` (for some reason).

In your `PostShow` component, add the following with the rest of your fields

```tsx
<FieldWithPermission
  options={{
    resource: 'posts',
    permission: 'edit',
  }}
  Input={DateField}
  inputProps={{
    showTime: true,
  }}
  label="Date"
  source="attributes.createdAt"
/>
```

`FieldWithPermission` takes all of the props that `FieldProps` does, as well as a few additions. These additional props are:

```typescript
type FieldWithPermissionProps<T> = {
  options: {
    resource: string;
    permission: PermissionKey;
  };
  inputProps: T;
  Input: (props: FieldProps & T) => JSX.Element;
};
```

In our example, the `Input` prop is the React component `DateField`. And `inputProps` takes `DateField`'s props. 

#### ResourceWithPermission

A generic wrapper over React Admin's `Resource` component. This will hide/show resources in the side `Menu` based on the specified resource and permission.

Scenario: You have a `users` resource that only an `admin` can access

After setting up your permissions accordingly, you can add the following to your `Admin` component at the root of your React Admin tree.

```tsx
<ResourceWithPermission
  name="users"
  list={UserShow}
/>
```

#### TabWithPermission

Todo


## Example

To run the example you need to:

`cd example`
`yarn`
`yarn start`

which will run the repo on localhost:1234

This is a pared down version of RA's simple example.

### Points of interest

- `useAcl` is used in `ShowActions` to hide/show the `EditButton`
- `TabWithPermission` is used in `PostShow` to hide/show the `comments` tab
- `ResourceWithPermission` is used in the `index` file to hide/show `resources` in the `Menu`.
- `FieldWithPermission` is used in `PostList` to hide/show the `EditButton`. 
- `FieldWithPermission` is used in `PostList` to hide/show the `EditButton`. 
- `FieldWithPermission` is used in the `PostShow` to hide/show the `SelectField`

