/* eslint react/jsx-key: off */
import * as React from 'react';

import {
  CloneButton,
  DeleteWithConfirmButton,
  Edit,
  FormTab,
  SaveButton,
  SelectInput,
  ShowButton,
  TabbedForm,
  TextInput,
  Toolbar,
  TopToolbar,
} from 'ra-ui-materialui';
import { required } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

/**
 * Custom Toolbar for the Edit form
 *
 * Save with undo, but delete with confirm
 */
const UserEditToolbar = props => {
  const classes = useToolbarStyles();
  return (
    <Toolbar {...props} classes={classes}>
      <SaveButton />
      <DeleteWithConfirmButton />
    </Toolbar>
  );
};

const UserEdit = ({ permissions, ...props }) => (
  <Edit {...props}>
    <TabbedForm defaultValue={{ role: 'user' }} toolbar={<UserEditToolbar />}>
      <FormTab label="user.form.summary" path="">
        {permissions === 'admin' && <TextInput disabled source="id" />}
        <TextInput
          source="name"
          defaultValue="slim shady"
          validate={required()}
        />
      </FormTab>
      {permissions === 'admin' && (
        <FormTab label="user.form.security" path="security">
          <SelectInput
            source="role"
            validate={required()}
            choices={[
              { id: '', name: 'None' },
              { id: 'admin', name: 'Admin' },
              { id: 'user', name: 'User' },
            ]}
            defaultValue={'user'}
          />
        </FormTab>
      )}
    </TabbedForm>
  </Edit>
);

export default UserEdit;
