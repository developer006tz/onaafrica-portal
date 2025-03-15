import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, type DataTableColumn, type DataTableAction } from '@/components/shared/table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];

interface UsersProps {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}

export default function UserScreen({ users }: UsersProps) {
  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      'manager': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      'sales-manager': 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
      'sales-officer': 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
      'it': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
      'graphics-designer': 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Define table columns
  const columns: DataTableColumn<User>[] = [
    {
      key: '#',
      label: '#',
      render: (_, index) => (users.current_page - 1) * users.per_page + index + 1,
    },
    {
      key: 'name',
      label: 'Name',
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      responsive: 'lg',
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (user) => user.phone || '-',
      responsive: 'xl',
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <Badge className={`${getRoleBadgeColor(user.role)} capitalize`}>
          {user.role.replace('-', ' ')}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'Joined',
      render: (user) => formatDate(user.created_at),
      responsive: 'lg',
    },
  ];

  // Define table actions
  const actions: DataTableAction<User>[] = [
    {
      icon: <Eye size={16} className="text-muted-foreground hover:text-foreground" />,
      label: 'View Details',
      onClick: (user) => {
        console.log('View user', user.id);
        // Implement view action
      },
    },
    {
      icon: <Edit size={16} className="text-blue-500 dark:text-blue-400" />,
      label: 'Edit User',
      onClick: (user) => {
        console.log('Edit user', user.id);
        // Implement edit action
      },
    },
    {
      icon: <Trash2 size={16} className="text-destructive" />,
      label: 'Delete User',
      variant: 'destructive',
      onClick: (user) => {
        console.log('Delete user', user.id);
        // Implement delete action
      },
    },
  ];

  // Define custom mobile card rendering
  const renderMobileCard = (user: User) => (
    <Card key={user.id} className="overflow-hidden">
      <div className="flex items-start justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <Badge className={`${getRoleBadgeColor(user.role)} mt-1 capitalize`}>
              {user.role.replace('-', ' ')}
            </Badge>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email:</span>
          <span className="truncate max-w-[180px]">{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span>{user.phone}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Joined:</span>
          <span>{formatDate(user.created_at)}</span>
        </div>
      </div>
    </Card>
  );

  const handleAddUser = () => {
    // Implement add user navigation/modal
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <Card className="flex h-full flex-1 flex-col gap-4">
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <CardTitle className="text-2xl font-bold">Staff Management</CardTitle>
            <Button className="flex items-center gap-2" onClick={handleAddUser}>
              <UserPlus size={16} />
              <span>Add New Staff</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <DataTable
            data={users.data}
            columns={columns}
            actions={actions}
            keyField="id"
            pagination={users}
            searchable={true}
            searchPlaceholder="Search staff..."
            filterable={true}
            onFilter={() => {
              // Implement filter functionality
            }}
            emptyState={{
              title: "No users found",
              action: {
                label: "Add your first staff member",
                icon: <UserPlus size={16} />,
                onClick: handleAddUser
              }
            }}
            mobileCardRender={renderMobileCard}
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
}