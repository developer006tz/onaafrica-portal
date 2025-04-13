import GlobalPaginator from '@/components/shared/global-paginator';
import InvoiceCard from '@/components/shared/invoice-card';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InvoicesData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileArchive } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: route('invoices.index'),
    },
    {
        title: 'List Invoice',
        href: route('invoices.index'),
    },
];

export default function InvoiceScreen({ invoices, filters }: { invoices: InvoicesData; filters?: Record<string, string> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">Invoices</CardTitle>
                            <Link href={route('invoices.create')} className="">
                                <Button className="flex items-center gap-2" variant="default">
                                    <FileArchive className="h-5 w-5" />
                                    <span>Create Invoice</span>
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-6">
                        {invoices.data.length === 0 ? (
                            <div className="flex flex-col gap-4">
                                <div className="rounded-lg border">
                                    <NoData message="No invoices found" />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                                {invoices.data.map((invoice) => (
                                    <InvoiceCard key={invoice.id} invoice={invoice} />
                                ))}
                            </div>
                        )}
                    </CardContent>

                     <GlobalPaginator data={invoices} />

                </Card>
            </div>
        </AppLayout>
    );
}
