import { FormDateInput } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { FormLabel, FormMessage } from '@/lib/form-helper';
import { formartCurrency } from '@/lib/helpers';
import { CompanyBranch, Customer, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowBigLeft, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

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
    companyBranches: CompanyBranch[];
}

interface InvoiceItem {
    item_description: string;
    unit_price: number;
    quantity: number;
    amount: number;
}

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

export default function InvoiceCreateScreen({ customers, companyBranches }: InvoiceScreenProps) {
    const { data, setData, post, processing, errors } = useForm<FormDataType>({
        invoice_type: 'invoice',
        issue_date: new Date().toISOString().split('T')[0],
        sub_total: 0,
        vat_rate: 18,
        vat_type: 'none',
        vat_amount: 0,
        total_amount: 0,
        delivery_timeline: 'Products will be delivered within 7 days of receiving the Local Purchase Order (LPO).',
        payment_terms: ' Payment is due 7 days after the receipt of the products.',
        delivery_location: 'Products will be delivered to the address specified in the LPO.',
        status: 'draft',
        achieved: 'no',
        customer_id: '',
        company_branch_id: companyBranches.length > 0 ? companyBranches[0].id : '',
        items: [{ item_description: '', unit_price: 0, quantity: 1, amount: 0 }],
    });

    useEffect(() => {
        if (companyBranches.length > 0 && !data.company_branch_id) {
            setData('company_branch_id', companyBranches[0].id);
        }
    }, [companyBranches, data.company_branch_id, setData]);

    const calculateTotals = (items: InvoiceItem[], vatType: string, vatRate: number) => {
        const subTotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        let vatAmount = 0;
        let totalAmount = subTotal;

        if (vatType === 'exclusive') {
            vatAmount = (subTotal * vatRate) / 100;
            totalAmount = subTotal + vatAmount;
        } else if (vatType === 'inclusive') {
            vatAmount = (subTotal * vatRate) / (100 + vatRate);
            totalAmount = subTotal;
        }

        return { 
            sub_total: Number(subTotal.toFixed(2)),
            vat_amount: Number(vatAmount.toFixed(2)),
            total_amount: Number(totalAmount.toFixed(2))
        };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('invoices.store'));
    };

    const addInvoiceItem = () => {
        const newItems = [
            ...data.items,
            { item_description: '', unit_price: 0, quantity: 1, amount: 0 }
        ];
        
        setData({
            ...data,
            items: newItems
        });
    };

    const removeInvoiceItem = (index: number) => {
        const newItems = data.items.filter((_, i) => i !== index);
        const totals = calculateTotals(newItems, data.vat_type, data.vat_rate);
        
        setData({
            ...data,
            items: newItems,
            ...totals
        });
    };

    const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...data.items];
        const newItem = { ...newItems[index] };
        
        (newItem as any)[field] = value;
        
        if (field === 'unit_price' || field === 'quantity') {
            const unitPrice = field === 'unit_price' ? Number(value) : newItem.unit_price;
            const quantity = field === 'quantity' ? Number(value) : newItem.quantity;
            newItem.amount = unitPrice * quantity;
        }
        
        newItems[index] = newItem;
        const totals = calculateTotals(newItems, data.vat_type, data.vat_rate);
        
        setData({
            ...data,
            items: newItems,
            ...totals
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

                                {/* Company Branch */}
                                <div className="space-y-2">
                                    <FormLabel htmlFor="company_branch_id">
                                        Invoice for which Branch? <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select value={data.company_branch_id} onValueChange={(value) => setData('company_branch_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companyBranches.map((branch) => (
                                                <SelectItem key={branch.id} value={branch.id}>
                                                    {branch.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.company_branch_id && <FormMessage>{errors.company_branch_id}</FormMessage>}
                                </div>


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
                                    <FormDateInput label="Date" value={data.issue_date} onChange={(value) => setData('issue_date', value)} error={errors.issue_date} />
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
                                            const newVatType = value as 'none' | 'inclusive' | 'exclusive';
                                            const newVatRate = newVatType === 'none' ? 0 : data.vat_rate;
                                            
                                            setData({
                                                ...data,
                                                vat_type: newVatType,
                                                vat_rate: newVatRate
                                            });
                                            
                                            const totals = calculateTotals(data.items, newVatType, newVatRate);
                                            setData(data => ({
                                                ...data,
                                                ...totals
                                            }));
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select VAT type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No VAT</SelectItem>
                                            <SelectItem value="inclusive">Inclusive</SelectItem>
                                            <SelectItem value="exclusive">Exclusive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.vat_type && <FormMessage>{errors.vat_type}</FormMessage>}
                                </div>

                                {/* Conditionally rendered VAT Rate */}
                                {data.vat_type !== 'none' && (
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="vat_rate">VAT Rate (%)</FormLabel>
                                        <Input
                                            type="number"
                                            id="vat_rate"
                                            value={data.vat_rate.toString()}
                                            onChange={(e) => {
                                                const newRate = Number(e.target.value);
                                                setData('vat_rate', newRate);
                                                const totals = calculateTotals(data.items, data.vat_type, newRate);
                                                setData(data => ({
                                                    ...data,
                                                    ...totals
                                                }));
                                            }}
                                        />
                                        {errors.vat_rate && <FormMessage>{errors.vat_rate}</FormMessage>}
                                    </div>
                                )}

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
                                                <td className="p-2 font-medium">{formartCurrency(data.sub_total.toFixed(2))}</td>
                                                <td></td>
                                            </tr>
                                            {data.vat_type !== 'none' && (
                                                <tr>
                                                    <td colSpan={3} className="p-2 text-red-400 text-right font-medium">
                                                        VAT ({data.vat_rate}%):
                                                    </td>
                                                    <td className="p-2 font-medium">{formartCurrency(data.vat_amount.toFixed(2))}</td>
                                                    <td></td>
                                                </tr>
                                            )}
                                            <tr className="bg-muted/50">
                                                <td colSpan={3} className="p-2 text-right font-medium">
                                                    Total:
                                                </td>
                                                <td className="p-2 font-medium">{formartCurrency(data.total_amount.toFixed(2))}</td>
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