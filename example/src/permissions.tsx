type Role = 'admin' | 'user';
type Resource = 'posts' | 'users' | 'comments';
type Permission = 'access' | 'show' | 'edit' | 'create' | 'list';

type Permissions = {
  [key in Role]: {
    [key in Resource]: {
      [key in Permission]?: boolean;
    };
  };
};

export const permissions: Permissions = {
  admin: {
    posts: {
      access: true,
      show: true,
      edit: true,
      create: true,
      list: true,
    },
    users: {
      access: true,
      show: true,
      edit: true,
      create: true,
      list: true,
    },
    comments: {
      access: true,
      show: true,
      edit: true,
      create: true,
      list: true,
    },
  },
  user: {
    posts: {
      access: true,
      show: true,
      list: true,
    },
    users: {},
    comments: {},
  },
};
