import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { FormLabel, FormMessage } from '@/lib/form-helper';
import { Customer, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowBigLeft, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: route('invoices.index'),
    },
    {
        title: 'Create Invoice',
        href: route('invoices.create'),
    },
];

interface InvoiceScreenProps {
    customers: Customer[];
}

interface InvoiceItem {
    item_description: string;
    unit_price: number;
    quantity: number;
    amount: number;
}

// Define the form data type to match what useForm expects
interface FormDataType {
    invoice_type: string;
    issue_date: string;
    sub_total: number;
    vat_rate: number;
    vat_type: string;
    vat_amount: number;
    total_amount: number;
    delivery_timeline: string;
    payment_terms: string;
    delivery_location: string;
    status: string;
    achieved: string;
    customer_id: string;
    company_branch_id: string;
    items: InvoiceItem[];
    [key: `items.${number}.${keyof InvoiceItem}`]: string;
    [key: string]: string | number | InvoiceItem[] | any;
}

export default function InvoiceCreateScreen({ customers }: InvoiceScreenProps) {
    // Initialize form with Inertia useForm with explicit typing
    const { data, setData, post, processing, errors } = useForm<FormDataType>({
        invoice_type: 'invoice',
        issue_date: new Date().toISOString().split('T')[0], // Today's date
        sub_total: 0,
        vat_rate: 18, // Default VAT rate in Tanzania
        vat_type: 'exclusive',
        vat_amount: 0,
        total_amount: 0,
        delivery_timeline: '',
        payment_terms: '',
        delivery_location: '',
        status: 'draft',
        achieved: 'no',
        customer_id: '',
        company_branch_id: '1', // Default company branch, adjust as needed
        items: [{ item_description: '', unit_price: 0, quantity: 1, amount: 0 }],
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('invoices.store'));
    };

    // Add a new invoice item
    const addInvoiceItem = () => {
        // Create a deep copy of the data
        const newData = { ...data };
        
        // Add a new item
        const newItems = [
            ...newData.items,
            { item_description: '', unit_price: 0, quantity: 1, amount: 0 }
        ];
        
        // Update all data at once
        setData({
            ...newData,
            items: newItems
        });
    };

    // Remove an invoice item
    const removeInvoiceItem = (index: number) => {
        // Create a deep copy of the data
        const newData = { ...data };
        
        // Filter out the item to remove
        const newItems = newData.items.filter((_, i) => i !== index);
        
        // Recalculate totals
        const subTotal = newItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        const vatAmount = newData.vat_type === 'exclusive' ? (subTotal * Number(newData.vat_rate)) / 100 : 0;
        const totalAmount = subTotal + vatAmount;
        
        // Update all data at once
        setData({
            ...newData,
            items: newItems,
            sub_total: subTotal,
            vat_amount: vatAmount,
            total_amount: totalAmount
        });
        
        // No need to return false
    };

    // Update an invoice item
    const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
        // Create a deep copy of the data
        const newData = { ...data };
        const newItems = [...newData.items];
        
        // Create a new item object
        const newItem = { ...newItems[index] };
        
        // Update the field
        newItem[field] = value;
        
        // Recalculate amount if necessary
        if (field === 'unit_price' || field === 'quantity') {
            const unitPrice = field === 'unit_price' ? Number(value) : newItem.unit_price;
            const quantity = field === 'quantity' ? Number(value) : newItem.quantity;
            newItem.amount = unitPrice * quantity;
        }
        
        // Update the array
        newItems[index] = newItem;
        
        // Recalculate totals
        const subTotal = newItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        const vatAmount = newData.vat_type === 'exclusive' ? (subTotal * Number(newData.vat_rate)) / 100 : 0;
        const totalAmount = subTotal + vatAmount;
        
        // Update all data at once
        setData({
            ...newData,
            items: newItems,
            sub_total: subTotal,
            vat_amount: vatAmount,
            total_amount: totalAmount
        });
    };

    // Recalculate subtotal, VAT, and total
    const recalculateTotals = (items: InvoiceItem[]) => {
        const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
        const vatAmount = data.vat_type === 'exclusive' ? (subTotal * Number(data.vat_rate)) / 100 : 0;
        const totalAmount = subTotal + vatAmount;

        setData({
            ...data,
            sub_total: subTotal,
            vat_amount: vatAmount,
            total_amount: totalAmount,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invoice" />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">Create new Invoice</CardTitle>
                            <Link href={route('invoices.index')} className="">
                                <Button className="flex items-center gap-2" variant="default">
                                    <ArrowBigLeft className="h-5 w-5" />
                                    <span>Go back</span>
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {/* Invoice Type */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="invoice_type">
                                        Invoice Type <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select value={data.invoice_type} onValueChange={(value) => setData('invoice_type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select invoice type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="invoice">Invoice</SelectItem>
                                            <SelectItem value="performa">Performa Invoice</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.invoice_type && <FormMessage>{errors.invoice_type}</FormMessage>}
                                </div>

                                {/* Issue Date */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="issue_date">
                                        Issue Date <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Input
                                        type="date"
                                        id="issue_date"
                                        value={data.issue_date}
                                        onChange={(e) => setData('issue_date', e.target.value)}
                                    />
                                    {errors.issue_date && <FormMessage>{errors.issue_date}</FormMessage>}
                                </div>

                                {/* Customer */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="customer_id">
                                        Customer <span className="text-red-500">*</span>
                                    </FormLabel>
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

                                {/* VAT Type */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="vat_type">VAT Type</FormLabel>
                                    <Select
                                        value={data.vat_type}
                                        onValueChange={(value) => {
                                            setData('vat_type', value);
                                            recalculateTotals(data.items);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select VAT type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="inclusive">Inclusive</SelectItem>
                                            <SelectItem value="exclusive">Exclusive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.vat_type && <FormMessage>{errors.vat_type}</FormMessage>}
                                </div>

                                {/* VAT Rate */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="vat_rate">VAT Rate (%)</FormLabel>
                                    <Input
                                        type="number"
                                        id="vat_rate"
                                        value={data.vat_rate.toString()}
                                        onChange={(e) => {
                                            setData('vat_rate', Number(e.target.value));
                                            recalculateTotals(data.items);
                                        }}
                                    />
                                    {errors.vat_rate && <FormMessage>{errors.vat_rate}</FormMessage>}
                                </div>

                                

                                {/* Status */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="status">Status</FormLabel>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="sent">Sent</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="overdue">Overdue</SelectItem>
                                            <SelectItem value="void">Void</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <FormMessage>{errors.status}</FormMessage>}
                                </div>
                            </div>

                            {/* Invoice Items */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Invoice Items</h3>
                                    <Button type="button" onClick={addInvoiceItem} variant="outline" className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        <span>Add Item</span>
                                    </Button>
                                </div>

                                {errors.items && <FormMessage>{errors.items}</FormMessage>}

                                <div className="rounded-md border">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-muted/50 border-b">
                                                <th className="p-2 text-left font-medium">Description</th>
                                                <th className="p-2 text-left font-medium">Unit Price</th>
                                                <th className="p-2 text-left font-medium">Quantity</th>
                                                <th className="p-2 text-left font-medium">Amount</th>
                                                <th className="p-2 text-left font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.items.map((item, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="p-2">
                                                        <Input
                                                            value={item.item_description || ''}
                                                            onChange={(e) => updateInvoiceItem(index, 'item_description', e.target.value)}
                                                            placeholder="Item description"
                                                        />
                                                        {errors[`items.${index}.item_description`] && (
                                                            <FormMessage>{errors[`items.${index}.item_description`]}</FormMessage>
                                                        )}
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={item.unit_price.toString()}
                                                            onChange={(e) => updateInvoiceItem(index, 'unit_price', Number(e.target.value))}
                                                            placeholder="0.00"
                                                        />
                                                        {errors[`items.${index}.unit_price`] && (
                                                            <FormMessage>{errors[`items.${index}.unit_price`]}</FormMessage>
                                                        )}
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={item.quantity.toString()}
                                                            onChange={(e) => updateInvoiceItem(index, 'quantity', Number(e.target.value))}
                                                            placeholder="1"
                                                        />
                                                        {errors[`items.${index}.quantity`] && (
                                                            <FormMessage>{errors[`items.${index}.quantity`]}</FormMessage>
                                                        )}
                                                    </td>
                                                    <td className="p-2">
                                                        <Input type="number" value={item.amount.toString()} readOnly className="bg-muted/50" />
                                                        {errors[`items.${index}.amount`] && (
                                                            <FormMessage>{errors[`items.${index}.amount`]}</FormMessage>
                                                        )}
                                                    </td>
                                                    <td className="p-2">
                                                        {data.items.length > 1 && (
                                                            <Button 
                                                            type="button" 
                                                            onClick={(e) => { 
                                                                e.preventDefault(); 
                                                                e.stopPropagation(); 
                                                                removeInvoiceItem(index); 
                                                            }} 
                                                            variant="ghost" 
                                                            size="sm"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                        
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="border-t">
                                                <td colSpan={3} className="p-2 text-right font-medium">
                                                    Subtotal:
                                                </td>
                                                <td className="p-2 font-medium">{data.sub_total.toFixed(2)}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="p-2 text-right font-medium">
                                                    VAT ({data.vat_rate}%):
                                                </td>
                                                <td className="p-2 font-medium">{data.vat_amount.toFixed(2)}</td>
                                                <td></td>
                                            </tr>
                                            <tr className="bg-muted/50">
                                                <td colSpan={3} className="p-2 text-right font-medium">
                                                    Total:
                                                </td>
                                                <td className="p-2 font-medium">{data.total_amount.toFixed(2)}</td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="space-y-2">
                                    <FormLabel htmlFor="delivery_timeline">Delivery Timeline</FormLabel>
                                    <Textarea
                                        id="delivery_timeline"
                                        value={data.delivery_timeline}
                                        onChange={(e) => setData('delivery_timeline', e.target.value)}
                                        placeholder="e.g., Within 7 working days"
                                    />
                                    {errors.delivery_timeline && <FormMessage>{errors.delivery_timeline}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <FormLabel htmlFor="payment_terms">Payment Terms</FormLabel>
                                    <Textarea
                                        id="payment_terms"
                                        value={data.payment_terms}
                                        onChange={(e) => setData('payment_terms', e.target.value)}
                                        placeholder="e.g., 50% advance, 50% on delivery"
                                    />
                                    {errors.payment_terms && <FormMessage>{errors.payment_terms}</FormMessage>}
                                </div>

                                <div className="space-y-2">
                                    <FormLabel htmlFor="delivery_location">Delivery Location</FormLabel>
                                    <Textarea
                                        id="delivery_location"
                                        value={data.delivery_location}
                                        onChange={(e) => setData('delivery_location', e.target.value)}
                                        placeholder="e.g., Client's office at Dar es Salaam"
                                    />
                                    {errors.delivery_location && <FormMessage>{errors.delivery_location}</FormMessage>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="w-full md:w-auto">
                                    {processing ? 'Creating...' : 'Create Invoice'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
