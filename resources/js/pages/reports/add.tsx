import { FormDateInput } from '@/components/form/FormDateInput';
import { AddCustomerDrawer } from '@/components/shared/add-customer-drawer';
import { AddPropertyDrawer } from '@/components/shared/add-property-drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { FormLabel, FormMessage } from '@/lib/form-helper';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daily-Reports',
        href: route('reports.index'),
    },
    {
        title: 'Add',
        href: route('reports.add'),
    },
];

export default function AddStaffDailyReportsScreen({
    customers,
    properties,
}: {
    customers: { id: string; name: string }[];
    properties: { id: string; name: string }[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        staff_id: '',
        customer_id: '',
        property_id: '',
        address: '',
        customer_phones: [''],
        time_from: '',
        time_to: '',
        description: '',
        status: 'PENDING',
        date: new Date().toISOString().split('T')[0],
    });

    const addPhoneNumber = () => {
        setData('customer_phones', [...data.customer_phones, '']);
    };

    const removePhoneNumber = (index: number) => {
        const updatedPhones = [...data.customer_phones];
        updatedPhones.splice(index, 1);
        setData('customer_phones', updatedPhones);
    };

    const updatePhoneNumber = (index: number, value: string) => {
        const updatedPhones = [...data.customer_phones];
        updatedPhones[index] = value;
        setData('customer_phones', updatedPhones);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('reports.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Daily Report" />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">Add Daily Report</CardTitle>
                            <Link href={route('reports.index')} className="">
                                <Button className="flex items-center gap-2" variant="default">
                                    <ArrowLeft className="h-5 w-5" />
                                    <span>Go Back</span>
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Customer Selection */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <FormLabel htmlFor="customer_id">Customer</FormLabel>
                                        <AddCustomerDrawer buttonVariant="outline" />
                                    </div>
                                    <Select value={data.customer_id} onValueChange={(value) => setData('customer_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map((customer) => (
                                                <SelectItem key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.customer_id && <FormMessage>{errors.customer_id}</FormMessage>}
                                </div>

                                {/* Property Selection */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <FormLabel htmlFor="property_id">Property</FormLabel>
                                        <AddPropertyDrawer buttonVariant="outline" />
                                    </div>
                                    <Select value={data.property_id} onValueChange={(value) => setData('property_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a property" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {properties.map((property) => (
                                                <SelectItem key={property.id} value={property.id}>
                                                    {property.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.property_id && <FormMessage>{errors.property_id}</FormMessage>}
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="address">Address</FormLabel>
                                    <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                    {errors.address && <FormMessage>{errors.address}</FormMessage>}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="status">Status</FormLabel>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="COMPLETE">Complete</SelectItem>
                                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <FormMessage>{errors.status}</FormMessage>}
                                </div>

                                {/* Time From */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="time_from">Time From</FormLabel>
                                    <Input id="time_from" type="time" value={data.time_from} onChange={(e) => setData('time_from', e.target.value)} />
                                    {errors.time_from && <FormMessage>{errors.time_from}</FormMessage>}
                                </div>

                                {/* Time To */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="time_to">Time To</FormLabel>
                                    <Input id="time_to" type="time" value={data.time_to} onChange={(e) => setData('time_to', e.target.value)} />
                                    {errors.time_to && <FormMessage>{errors.time_to}</FormMessage>}
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <FormDateInput label="Date" value={data.date} onChange={(value) => setData('date', value)} error={errors.date} />
                                </div>
                            </div>

                            {/* Customer Phones */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <FormLabel htmlFor="customer_phones">Customer Phone Numbers</FormLabel>
                                    <Button type="button" variant="outline" size="sm" onClick={addPhoneNumber} className="flex items-center gap-1">
                                        <Plus size={16} />
                                        <span>Add Phone</span>
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {data.customer_phones.map((phone, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Input
                                                value={phone}
                                                onChange={(e) => updatePhoneNumber(index, e.target.value)}
                                                placeholder="Enter phone number"
                                            />
                                            {data.customer_phones.length > 1 && (
                                                <Button type="button" variant="outline" size="icon" onClick={() => removePhoneNumber(index)}>
                                                    <Trash size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.customer_phones && <FormMessage>{errors.customer_phones}</FormMessage>}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={5}
                                />
                                {errors.description && <FormMessage>{errors.description}</FormMessage>}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="w-full md:w-auto">
                                    Save Report
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
