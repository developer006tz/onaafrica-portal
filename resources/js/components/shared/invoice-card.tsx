import { getInvoiceStatusBadgeClass, getInvoiceTypeClass } from '@/lib/global-helper';
import { formartCurrency } from '@/lib/helpers';
import { type Invoice } from '@/types';
import { Link } from '@inertiajs/react';

interface InvoiceCardProps {
    invoice: Invoice;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    return (
        <div
            key={invoice.id}
            className="group border-border bg-card text-card-foreground hover:border-border/80 relative overflow-hidden rounded-xl border transition-all hover:shadow-xl"
        >
            {/* Mobile view - Card layout */}
            <div className="md:hidden">
                <div className="border-border/50 flex flex-wrap items-center gap-2 border-b p-3">
                    <span className="bg-muted text-muted-foreground ring-border/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                        #{invoice.invoice_number}
                    </span>
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getInvoiceStatusBadgeClass(invoice.status)}`}
                    >
                        {invoice.status}
                    </span>
                    <span className="text-muted-foreground ml-auto text-xs font-medium">{invoice.issue_date}</span>
                </div>
                <div className="space-y-3 p-4">
                    <div>
                        <p className="text-sm font-medium">Customer:</p>
                        <h3 className="text-foreground text-base font-semibold">{invoice.customer.name}</h3>
                        <p className="mt-2 text-sm font-medium">Branch:</p>
                        <p className="text-muted-foreground text-sm">{invoice.company_branch}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Invoice type:</p>
                        <p className="text-muted-foreground text-sm">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getInvoiceTypeClass(invoice.invoice_type)}`}>
                            {invoice.invoice_type}
                        </span> 
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Amount:</p>
                        <p className="text-muted-foreground text-sm">{formartCurrency(invoice.total_amount)}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Created:</p>
                        <p className="text-muted-foreground text-sm">{invoice.created_at}</p>
                    </div>
                    <div className="pt-2">
                        <Link href={route('invoices.show', invoice.id)} className="custom-outline-button block w-full text-center">
                            Open Invoice
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop view - Table/Grid layout */}
            <div className="hidden md:block">
                {/* Column Headers */}
                <div className="border-border/50 grid grid-cols-8 gap-4 border-b px-4 pt-4 pb-2 font-medium">
                    <div className="text-muted-foreground text-xs">Invoice #</div>
                    <div className="text-muted-foreground text-xs">Customer</div>
                    <div className="text-muted-foreground text-xs">Branch</div>
                    <div className="text-muted-foreground text-xs">Invoice type</div>
                    <div className="text-muted-foreground text-xs">Issue Date</div>
                    <div className="text-muted-foreground text-xs">Amount</div>
                    <div className="text-muted-foreground text-xs">Status</div>
                    <div className="text-muted-foreground text-xs">Actions</div>
                </div>
                <div className="grid grid-cols-8 items-center gap-4 p-4">
                    {/* Column 1: Invoice Number */}
                    <div className="text-sm">
                        <span className="bg-muted text-muted-foreground ring-border/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                            #{invoice.invoice_number}
                        </span>
                    </div>

                    {/* Column 2: Customer */}
                    <div className="text-sm font-medium">{invoice.customer.name}</div>

                    {/* Column 3: Branch */}
                    <div className="text-muted-foreground text-sm">{invoice.company_branch}</div>

                    {/* Column 4: Type */}
                    <div className="text-muted-foreground text-sm capitalize">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getInvoiceTypeClass(invoice.invoice_type)}`}>
                            {invoice.invoice_type}
                        </span> 
                    </div>

                    {/* Column 5: Issue Date */}
                    <div className="text-muted-foreground text-sm">{invoice.issue_date}</div>

                    {/* Column 6: Amount */}
                    <div className="text-muted-foreground text-sm font-semibold">{formartCurrency(invoice.total_amount)}</div>

                    {/* Column 7: Status */}
                    <div>
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getInvoiceStatusBadgeClass(invoice.status)}`}
                        >
                            {invoice.status}
                        </span>
                    </div>

                    {/* Column 8: Actions */}
                    <div className="flex items-center justify-between gap-2">
                        <Link href={route('invoices.show', invoice.id)} className="custom-outline-button px-2 py-1 text-xs whitespace-nowrap">
                            Open
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
