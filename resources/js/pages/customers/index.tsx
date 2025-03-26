import AppLayout from '@/layouts/app-layout';
import { Customer, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AddCustomerDrawer } from '@/components/shared/add-customer-drawer';
import NoData from '@/components/shared/no-data';
import { formatDate } from '@/lib/helpers';


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
      <Head title="Staffs" />
      <Card className="flex h-full flex-1 flex-col gap-4 m-4">
      <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-2xl font-semibold">Customers</CardTitle>
            <AddCustomerDrawer />
          </div>
        </CardHeader>

        <CardContent className="p-6">
        <div className="hidden rounded-lg border border-border md:block">
            {customers.data.length> 0 ? (
              <>
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead className="hidden lg:table-cell">Email</TableHead>
                        <TableHead className="hidden xl:table-cell">Phone</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead className="hidden lg:table-cell">Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.data.map((customer, index) => (
                            <TableRow key={customer.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                                {customer.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                              </div>
                            </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{customer.email}</TableCell>
                            <TableCell className="hidden xl:table-cell">{customer.phone}</TableCell>
                            <TableCell>
                                <Link href="/staffs" className='cursor-pointer hover:underline'>
                                {customer.created_by}
                                </Link>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                {formatDate(customer.created_at)}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                <Button size="icon" variant="ghost">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                  </TableBody>
                </Table>

                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-4 py-4 sm:flex-row">
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    Showing <span className="font-medium">{(customers.current_page - 1) * customers.per_page + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(customers.current_page * customers.per_page, customers.total)}</span>{' '}
                    of <span className="font-medium">{customers.total}</span> results
                  </div>
                  <Pagination className="flex flex-wrap justify-end gap-1">
                    {customers.links.map((link, i) => (
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
                    <div className="flex h-64 items-center justify-center my-4">
                      <div className="text-center">
                        <NoData message='no customer data' />
                      </div>
                    </div>
                  )}
                  </div>
        </CardContent>
        
      </Card>
    </AppLayout>
  );
}