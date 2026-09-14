import type { CollectionConfig, Access } from 'payload'

// Role-based access helpers per admin-panel-spec.md §3
const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}

const isAdminOrContentEditor: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'content-editor'
}

const isAdminOrSales: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'sales'
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'content-editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Sales', value: 'sales' },
        { label: 'Content Editor', value: 'content-editor' },
      ],
      access: {
        // Only super admins can change roles
        update: isAdmin as any,
      },
    },
  ],
}

// Export access helpers for use in other collections
export { isAdmin, isAdminOrContentEditor, isAdminOrSales }
