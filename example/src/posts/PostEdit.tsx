import * as React from 'react';
import {
  TopToolbar,
  AutocompleteInput,
  ArrayInput,
  BooleanInput,
  CheckboxGroupInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  CloneButton,
  ShowButton,
  EditButton,
  FormTab,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceManyField,
  ReferenceInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput,
  minValue,
  number,
  required,
  FormDataConsumer,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const PostEdit = ({ permissions, ...props }) => (
  <Edit {...props}>
    <TabbedForm initialValues={{ average_note: 0 }} warnWhenUnsavedChanges>
      <FormTab label="post.form.summary">
        <TextInput
          multiline={true}
          fullWidth={true}
          source="teaser"
          validate={required()}
          resettable
        />
        <CheckboxGroupInput
          source="notifications"
          choices={[
            { id: 12, name: 'Ray Hakt' },
            { id: 31, name: 'Ann Gullar' },
            { id: 42, name: 'Sean Phonee' },
          ]}
        />
        <ImageInput multiple source="pictures" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>

        <ArrayInput source="authors">
          <SimpleFormIterator>
            <ReferenceInput label="User" source="user_id" reference="users">
              <AutocompleteInput />
            </ReferenceInput>
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, ...rest }) =>
                scopedFormData && scopedFormData.user_id ? (
                  <SelectInput
                    label="Role"
                    source={getSource?.('role')}
                    choices={[
                      {
                        id: 'headwriter',
                        name: 'Head Writer',
                      },
                      {
                        id: 'proofreader',
                        name: 'Proof reader',
                      },
                      {
                        id: 'cowriter',
                        name: 'Co-Writer',
                      },
                    ]}
                    {...rest}
                  />
                ) : null
              }
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="post.form.miscellaneous">
        <ArrayInput source="backlinks">
          <SimpleFormIterator>
            <DateInput source="date" />
            <TextInput source="url" validate={required()} />
          </SimpleFormIterator>
        </ArrayInput>
        {/* <DateInput source="published_at" options={{ locale: 'pt' }} /> */}
        <SelectInput
          allowEmpty
          resettable
          source="category"
          choices={[
            { name: 'Tech', id: 'tech' },
            { name: 'Lifestyle', id: 'lifestyle' },
          ]}
        />
        <NumberInput
          source="average_note"
          validate={[required(), number(), minValue(0)]}
        />
        <BooleanInput source="commentable" defaultValue />
        <TextInput disabled source="views" />
      </FormTab>
      <FormTab label="post.form.comments">
        <ReferenceManyField
          reference="comments"
          target="post_id"
          addLabel={false}
          fullWidth
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default PostEdit;
