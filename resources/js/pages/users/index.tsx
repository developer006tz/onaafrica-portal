import GlobalPaginator from '@/components/shared/global-paginator';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import NoData from '@/components/shared/no-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { getRoleBadgeColor } from '@/lib/global-helper';
import { formatDate } from '@/lib/helpers';
import { type BreadcrumbItem, type User } from '@/types';
import { Deferred, Head, Link } from '@inertiajs/react';
import { Edit, Eye, Filter, Search, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';

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
                        <CardHeader className="p-4 pb-0 sm:p-6">
                            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <CardTitle className="text-xl font-semibold sm:text-2xl">Staff Management</CardTitle>
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
                            <form className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input
                                        placeholder="Search staff..."
                                        className="pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" variant="outline" className="flex items-center gap-2">
                                    <Filter className="h-4 w-4" />
                                    <span className="hidden sm:inline">Filters</span>
                                </Button>
                            </form>

                            <div className="border-border rounded-lg border">
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
                                                            <TableCell className="font-medium">
                                                                {(users.current_page - 1) * users.per_page + index + 1}
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2 sm:gap-3">
                                                                    <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full font-semibold sm:h-10 sm:w-10">
                                                                        {user.photo ? (
                                                                            <img
                                                                                src={user.photo}
                                                                                alt={user.name}
                                                                                className="h-full w-full rounded-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            user.name.charAt(0).toUpperCase()
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <div className="max-w-[120px] truncate text-sm font-medium sm:max-w-none sm:text-base">
                                                                            {user.name}
                                                                        </div>
                                                                        <div className="text-muted-foreground max-w-[120px] truncate text-xs md:hidden">
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

                                        <GlobalPaginator data={users} />
                                    </>
                                ) : (
                                    <div className="my-4 flex h-64 items-center justify-center">
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
