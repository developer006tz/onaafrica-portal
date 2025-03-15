import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkScreenSize();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-card text-card-foreground p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold">Staff Management</h1>
                    <Button className="flex items-center gap-2 w-full sm:w-auto">
                        <UserPlus size={16} />
                        <span>Add New Staff</span>
                    </Button>
                </div>

                <div className="rounded-lg border border-border overflow-hidden">
                    {users.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px] hidden md:table-cell">#</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden lg:table-cell">Phone</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="hidden md:table-cell">Joined</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.data.map((user, index) => (
                                            <TableRow key={user.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium hidden md:table-cell">{(users.current_page - 1) * users.per_page + index + 1}</TableCell>
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
                                                            <div className="text-xs text-muted-foreground md:hidden">{user.email}</div>
                                                            {user.phone && <div className="text-xs text-muted-foreground lg:hidden">{user.phone}</div>}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                                <TableCell className="hidden lg:table-cell">{user.phone || '-'}</TableCell>
                                                <TableCell>
                                                    <Badge className={`${getRoleBadgeColor(user.role)} capitalize`}>
                                                        {user.role.replace('-', ' ')}
                                                    </Badge>
                                                    <div className="text-xs text-muted-foreground md:hidden mt-1">{formatDate(user.created_at)}</div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{formatDate(user.created_at)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Eye size={16} className="text-muted-foreground hover:text-foreground" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                                                            <Edit size={16} className="text-blue-500 dark:text-blue-400" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                                                            <Trash2 size={16} className="text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-border gap-4">
                                <div className="text-sm text-muted-foreground text-center sm:text-left">
                                    Showing <span className="font-medium">{(users.current_page - 1) * users.per_page + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(users.current_page * users.per_page, users.total)}
                                    </span>{' '}
                                    of <span className="font-medium">{users.total}</span> results
                                </div>
                                <Pagination className="w-full sm:w-auto">
                                    <PaginationContent className="flex-wrap justify-center">
                                        {users.links.map((link, i) => (
                                            <PaginationItem key={i}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-3 sm:px-4 py-2`}
                                                    >
                                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                    </Link>
                                                ) : (
                                                    <Button 
                                                        variant="outline"
                                                        disabled
                                                        className="opacity-50 cursor-not-allowed"
                                                    >
                                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                    </Button>
                                                )}
                                            </PaginationItem>
                                        ))}
                                    </PaginationContent>
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
            </div>
        </AppLayout>
    );
}
