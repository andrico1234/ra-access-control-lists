/* eslint react/jsx-key: off */
import PeopleIcon from '@material-ui/icons/People';
import * as React from 'react';
import {
  BulkDeleteWithConfirmButton,
  Datagrid,
  Filter,
  List,
  SearchInput,
  TextField,
  TextInput,
} from 'ra-ui-materialui';

export const UserIcon = PeopleIcon;

const UserFilter = ({ permissions, ...props }) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <TextInput source="name" />
    {permissions === 'admin' ? <TextInput source="role" /> : null}
  </Filter>
);

const UserBulkActionButtons = props => (
  <BulkDeleteWithConfirmButton {...props} />
);

const UserList = ({ permissions, ...props }) => (
  <List
    {...props}
    filters={<UserFilter permissions={permissions} />}
    filterDefaultValues={{ role: 'user' }}
    sort={{ field: 'name', order: 'ASC' }}
    bulkActionButtons={<UserBulkActionButtons />}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      {permissions === 'admin' && <TextField source="role" />}
    </Datagrid>
  </List>
);

export default UserList;
