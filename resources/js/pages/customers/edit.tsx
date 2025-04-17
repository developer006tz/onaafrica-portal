import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { FormLabel, FormMessage } from '@/lib/form-helper';
import { Customer, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
    {
        title: 'Edit Customer',
        href: '#',
    },
];

interface EditCustomerProps {
    customer: Customer & {
        contact_person?: string;
        contact_person_phone?: string;
        address?: string;
        tin?: string;
        vrn?: string;
    };
}

export default function EditCustomer({ customer }: EditCustomerProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: customer.name || '',
        contact_person: customer.contact_person || '',
        contact_person_phone: customer.contact_person_phone || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        tin: customer.tin || '',
        vrn: customer.vrn || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('customers.update', { id: customer.id }), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Customer - ${customer.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-2">
                                <Link href={route('customers.index')}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <CardTitle className="text-xl font-semibold sm:text-2xl">Edit Customer</CardTitle>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <FormLabel htmlFor="name">
                                        Customer name <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Input
                                        id="name"
                                        className="border bg-gray-50 dark:bg-black/40"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <FormMessage>{errors.name}</FormMessage>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div className="space-y-2">
                                    <FormLabel htmlFor="contact_person">Contact Person</FormLabel>
                                    <Input
                                        id="contact_person"
                                        className="border bg-gray-50 dark:bg-black/40"
                                        type="text"
                                        value={data.contact_person}
                                        onChange={(e) => setData('contact_person', e.target.value)}
                                    />
                                    {errors.contact_person && <FormMessage>{errors.contact_person}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <FormLabel htmlFor="contact_person">Contact Person Phone</FormLabel>
                                    <Input
                                        id="contact_person_phone"
                                        className="border bg-gray-50 dark:bg-black/40"
                                        type="tel"
                                        value={data.contact_person_phone}
                                        onChange={(e) => setData('contact_person_phone', e.target.value)}
                                    />
                                    {errors.contact_person_phone && <FormMessage>{errors.contact_person_phone}</FormMessage>}
                                </div>


                                </div>
                                

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            id="email"
                                            className="border bg-gray-50 dark:bg-black/40"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <FormMessage>{errors.email}</FormMessage>}
                                    </div>

                                    <div className="space-y-2">
                                        <FormLabel htmlFor="phone">
                                            Customer Phone <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Input
                                            id="phone"
                                            className="border bg-gray-50 dark:bg-black/40"
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <FormLabel htmlFor="address">Address</FormLabel>
                                    <textarea
                                        id="address"
                                        className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[80px] w-full rounded-md border bg-gray-50 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black/40"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && <FormMessage>{errors.address}</FormMessage>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="tin">TIN</FormLabel>
                                        <Input
                                            id="tin"
                                            className="border bg-gray-50 dark:bg-black/40"
                                            type="text"
                                            value={data.tin}
                                            onChange={(e) => setData('tin', e.target.value)}
                                        />
                                        {errors.tin && <FormMessage>{errors.tin}</FormMessage>}
                                    </div>

                                    <div className="space-y-2">
                                        <FormLabel htmlFor="vrn">VRN</FormLabel>
                                        <Input
                                            id="vrn"
                                            className="border bg-gray-50 dark:bg-black/40"
                                            type="text"
                                            value={data.vrn}
                                            onChange={(e) => setData('vrn', e.target.value)}
                                        />
                                        {errors.vrn && <FormMessage>{errors.vrn}</FormMessage>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={route('customers.index')}>
                                    <Button variant="destructive" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Customer'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
