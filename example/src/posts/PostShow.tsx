import * as React from 'react';
import {
  ArrayField,
  BooleanField,
  CloneButton,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  NumberField,
  ReferenceArrayField,
  ReferenceManyField,
  RichTextField,
  SelectField,
  ShowContextProvider,
  ShowView,
  SingleFieldList,
  Tab,
  TabbedShowLayout,
  TextField,
  UrlField,
  useShowController,
  useLocale,
  TopToolbar,
} from 'react-admin';
import { TabWithPermission } from '../../../src/TabWithPermission';
import { FieldWithPermission } from '../../../src/FieldWithPermission';
import { useACL } from '../../../src/useACL';

const ShowActions = ({ basePath, data }: any) => {
  const { edit: canEdit } = useACL('posts');

  return (
    <TopToolbar>
      <CloneButton className="button-clone" basePath={basePath} record={data} />
      {canEdit && <EditButton basePath={basePath} record={data} />}
    </TopToolbar>
  );
};

const PostShow = props => {
  const controllerProps = useShowController(props);
  const locale = useLocale();
  return (
    <ShowContextProvider value={controllerProps}>
      <ShowView {...props} actions={<ShowActions />}>
        <TabbedShowLayout>
          <Tab label="post.form.summary">
            <TextField source="id" />
            <TextField source="title" />
            {controllerProps.record &&
              controllerProps.record.title ===
                'Fusce massa lorem, pulvinar a posuere ut, accumsan ac nisi' && (
                <TextField source="teaser" />
              )}
            <ArrayField source="backlinks">
              <Datagrid>
                <DateField source="date" />
                <UrlField source="url" />
              </Datagrid>
            </ArrayField>
          </Tab>
          <Tab label="post.form.body">
            <RichTextField
              source="body"
              stripTags={false}
              label=""
              addLabel={false}
            />
          </Tab>
          <Tab label="post.form.miscellaneous">
            <ReferenceArrayField
              reference="tags"
              source="tags"
              sort={{ field: `name.${locale}`, order: 'ASC' }}
            >
              <SingleFieldList>
                <ChipField source={`name.${locale}`} />
              </SingleFieldList>
            </ReferenceArrayField>
            <DateField source="published_at" />
            <FieldWithPermission
              source="category"
              options={{
                resource: 'posts',
                permission: 'create',
              }}
              Input={SelectField}
              inputProps={{
                choices: [
                  { name: 'Tech', id: 'tech' },
                  { name: 'Lifestyle', id: 'lifestyle' },
                ],
              }}
            />

            <NumberField source="average_note" />
            <BooleanField source="commentable" />
            <TextField source="views" />
            <CloneButton />
          </Tab>
          <TabWithPermission
            options={{
              resource: 'comments',
              permission: 'show',
            }}
            label="post.form.comments"
          >
            <ReferenceManyField
              addLabel={false}
              reference="comments"
              target="post_id"
              sort={{ field: 'created_at', order: 'DESC' }}
            >
              <Datagrid>
                <DateField source="created_at" />
                <TextField source="author.name" />
                <TextField source="body" />
                <EditButton />
              </Datagrid>
            </ReferenceManyField>
          </TabWithPermission>
        </TabbedShowLayout>
      </ShowView>
    </ShowContextProvider>
  );
};

export default PostShow;
