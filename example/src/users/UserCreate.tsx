/* eslint react/jsx-key: off */
import * as React from 'react';
import {
  Create,
  FormTab,
  AutocompleteInput,
  TabbedForm,
  TextInput,
} from 'ra-ui-materialui';
import { required } from 'ra-core';

const UserCreate = ({ permissions, ...props }) => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="user.form.summary" path="">
        <TextInput
          source="name"
          defaultValue="Slim Shady"
          autoFocus
          validate={[required()]}
        />
      </FormTab>
      {permissions === 'admin' && (
        <FormTab label="user.form.security" path="security">
          <AutocompleteInput
            source="role"
            choices={[
              { id: '', name: 'None' },
              { id: 'admin', name: 'Admin' },
              { id: 'user', name: 'User' },
              { id: 'user_simple', name: 'UserSimple' },
            ]}
          />
        </FormTab>
      )}
    </TabbedForm>
  </Create>
);

export default UserCreate;
