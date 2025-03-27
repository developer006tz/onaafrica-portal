import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head,Link,Deferred } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, UserPlus, Filter, Search, MoreHorizontal } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatDate } from '@/lib/helpers';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Staffs',
    href: '/staffs',
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
  const [searchQuery, setSearchQuery] = useState('');

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


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Staffs" />
      <Deferred data="users" fallback={<LoadingSpinner />}>
      <Card className="flex h-full flex-1 flex-col gap-4 m-4">
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <CardTitle className="text-2xl font-bold">Staff Management</CardTitle>
            <Link href={route('staffs.add')}>
              <Button className="flex items-center gap-2">
                <UserPlus size={16} />
                <span>Add New Staff</span>
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Search and filter section */}
          <form className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type='submit' variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </form>

          {/* Table for desktop and tablet */}
          <div className="hidden rounded-lg border border-border md:block">
            {users.data.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden lg:table-cell">Email</TableHead>
                        <TableHead className="hidden xl:table-cell">Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden lg:table-cell">Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.data.map((user, index) => (
                        <TableRow key={user.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{(users.current_page - 1) * users.per_page + index + 1}</TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
                          <TableCell className="hidden xl:table-cell">{user.phone || '-'}</TableCell>
                          <TableCell>
                            <Badge className={`${getRoleBadgeColor(user.role)} capitalize`}>
                              {user.role.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{formatDate(user.created_at)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                                <Eye size={16} className="text-muted-foreground hover:text-foreground" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                                <Edit size={16} className="text-blue-500 dark:text-blue-400" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                                <Trash2 size={16} className="text-destructive" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild className="md:hidden">
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye size={16} className="mr-2" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit size={16} className="mr-2" /> Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 size={16} className="mr-2" /> Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-4 py-4 sm:flex-row">
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    Showing <span className="font-medium">{(users.current_page - 1) * users.per_page + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(users.current_page * users.per_page, users.total)}</span>{' '}
                    of <span className="font-medium">{users.total}</span> results
                  </div>
                  <Pagination className="flex flex-wrap justify-end gap-1">
                    {users.links.map((link, i) => (
                      link.url ? (
                        <Link
                          key={i}
                          href={link.url}
                          className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-input px-3 py-1 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                        >
                          <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                      ) : (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          disabled
                          className="h-8 min-w-8 px-3 py-1 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm opacity-50 cursor-not-allowed"
                        >
                          <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                      )
                    ))}
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">No users found</p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserPlus size={16} />
                    <span>Add your first staff member</span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Card view for mobile */}
          <div className="md:hidden space-y-4">
            {users.data.length > 0 ? (
              <>
                {users.data.map((user) => (
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye size={16} className="mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit size={16} className="mr-2" /> Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={16} className="mr-2" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                ))}

                <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 sm:flex-row">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{users.total}</span> total results
                  </div>
                  <Pagination className="flex flex-wrap justify-center gap-1">
                    {users.links.map((link, i) => (
                      link.url ? (
                        <Link
                          key={i}
                          href={link.url}
                          className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-input px-3 py-1 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                        >
                          <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                      ) : (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          disabled
                          className="h-8 min-w-8 px-3 py-1 text-xs opacity-50 cursor-not-allowed"
                        >
                          <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                      )
                    ))}
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">No users found</p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserPlus size={16} />
                    <span>Add your first staff member</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </Deferred>
    </AppLayout>
  );
}