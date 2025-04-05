
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {  FileArchive } from 'lucide-react';

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

export default function InvoiceScreen() {
    const { auth } = usePage<SharedData>().props;
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
                        
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
