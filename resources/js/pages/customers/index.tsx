import { AddCustomerDrawer } from '@/components/shared/add-customer-drawer';
import GlobalPaginator from '@/components/shared/global-paginator';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/helpers';
import { Customer, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

interface CustomerProps {
    customers: {
        data: Customer[];
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

export default function CustomerScreen({ customers }: CustomerProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">Customers</CardTitle>
                            <AddCustomerDrawer />
                        </div>
                    </CardHeader>

                    <CardContent className="p-2 sm:p-6">
                        <div className="border-border rounded-lg border">
                            {customers.data.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[40px] sm:w-[50px]">#</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead className="hidden md:table-cell">Email</TableHead>
                                                    <TableHead className="hidden xl:table-cell">Phone</TableHead>
                                                    <TableHead className="hidden sm:table-cell">Created By</TableHead>
                                                    <TableHead className="hidden lg:table-cell">Joined</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {customers.data.map((customer, index) => (
                                                    <TableRow key={customer.id}>
                                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2 sm:gap-3">
                                                                <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full font-semibold sm:h-10 sm:w-10">
                                                                    {customer.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <div className="max-w-[120px] truncate text-sm font-medium sm:max-w-none sm:text-base">
                                                                        {customer.name}
                                                                    </div>
                                                                    <div className="text-muted-foreground max-w-[120px] truncate text-xs md:hidden">
                                                                        {customer.email}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                                                        <TableCell className="hidden xl:table-cell">{customer.phone}</TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Link href="/staffs" className="cursor-pointer hover:underline">
                                                                {customer.created_by}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell className="hidden lg:table-cell">{formatDate(customer.created_at)}</TableCell>
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

                                    <GlobalPaginator data={customers} />
                                </>
                            ) : (
                                <div className="my-4 flex h-64 items-center justify-center">
                                    <div className="text-center">
                                        <NoData message="no customer data" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
