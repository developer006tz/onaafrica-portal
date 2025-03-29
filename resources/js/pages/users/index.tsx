import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, Deferred } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, UserPlus, Filter, Search } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatDate } from '@/lib/helpers';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { getRoleBadgeColor } from '@/lib/global-helper';
import NoData from '@/components/shared/no-data';

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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Staffs" />
      <Deferred data="users" fallback={<LoadingSpinner />}>
      <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
        <Card className="flex h-full flex-1 flex-col">
          <CardHeader className="p-4 sm:p-6 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
              <CardTitle className="text-xl sm:text-2xl font-semibold">Staff Management</CardTitle>
              <Link href={route('staffs.add')}>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Add New Staff</span>
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="p-2 sm:p-6">
            {/* Search and filter section */}
            <form className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row">
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
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </form>

            <div className="rounded-lg border border-border">
              {users.data.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px] sm:w-[50px]">#</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden md:table-cell">Email</TableHead>
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
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                                  {user.photo ? (
                                    <img src={user.photo} alt={user.name} className="h-full w-full rounded-full object-cover" />
                                  ) : (
                                    user.name.charAt(0).toUpperCase()
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
                                    {user.name}
                                  </div>
                                  <div className="md:hidden text-xs text-muted-foreground truncate max-w-[120px]">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden xl:table-cell">{user.phone || '-'}</TableCell>
                            <TableCell>
                              <Badge className={`${getRoleBadgeColor(user.role)} capitalize`}>
                                {user.role.replace('-', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{formatDate(user.created_at)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1 sm:gap-2">
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-2 sm:px-4 py-3 sm:py-4 sm:flex-row">
                    <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      Showing <span className="font-medium">{(users.current_page - 1) * users.per_page + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(users.current_page * users.per_page, users.total)}</span>{' '}
                      of <span className="font-medium">{users.total}</span> results
                    </div>
                    <Pagination className="flex flex-wrap justify-center sm:justify-end gap-1">
                      {users.links.map((link, i) => (
                        link.url ? (
                          <Link
                            key={i}
                            href={link.url}
                            className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex h-7 min-w-7 sm:h-8 sm:min-w-8 items-center justify-center rounded-md border border-input px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                          >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                          </Link>
                        ) : (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            disabled
                            className="h-7 min-w-7 sm:h-8 sm:min-w-8 px-2 sm:px-3 py-1 text-xs sm:text-sm opacity-50 cursor-not-allowed"
                          >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                          </Button>
                        )
                      ))}
                    </Pagination>
                  </div>
                </>
              ) : (
                <div className="flex h-64 items-center justify-center my-4">
                  <div className="text-center">
                    <NoData message="No users found" />
                    <Button variant="outline" className="mt-4 flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Add your first staff member</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      </Deferred>
    </AppLayout>
  );
}