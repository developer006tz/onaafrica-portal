import { getStatusBadgeClass } from '@/lib/global-helper';
import { formatPhones, getTimeSpent } from '@/lib/helpers';
import { type Report } from '@/types';
import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

interface ReportCardProps {
    report: Report;
    isPreviousReport?: boolean;
}

export default function ReportCard({ report, isPreviousReport = false }: ReportCardProps) {
    return (
        <div
            key={report.id}
            className={`group border-border bg-card text-card-foreground hover:border-border/80 relative overflow-hidden rounded-xl border transition-all hover:shadow-xl ${isPreviousReport ? 'opacity-90' : ''}`}
        >
            {/* Mobile view - Card layout */}
            <div className="md:hidden">
                <div className="border-border/50 flex flex-wrap items-center gap-2 border-b p-3">
                    <span className="bg-muted text-muted-foreground ring-border/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                        #{report.reference_number}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                    </span>
                    <span className="text-muted-foreground ml-auto text-xs font-medium">{report.date}</span>
                </div>
                <div className="space-y-3 p-4">
                    <div>
                        <p className="text-sm font-medium">Customer:</p>
                        <h3 className="text-foreground text-base font-semibold">{report.customer}</h3>
                        <p className="mt-2 text-sm font-medium">Property Type:</p>
                        <p className="text-muted-foreground text-sm">{report.property_type}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Address:</p>
                        <p className="text-muted-foreground line-clamp-2 text-sm">{report.address}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Phone:</p>
                        <p className="text-muted-foreground text-sm">{formatPhones(report.customer_phones)}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Time Spent:</p>
                        <p className="text-muted-foreground flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" /> {getTimeSpent(report.time_from, report.time_to)}
                        </p>
                    </div>
                    {report.description && (
                        <div>
                            <p className="text-sm font-medium">Remarks:</p>
                            <p className="text-muted-foreground line-clamp-2 text-sm">{report.description}</p>
                        </div>
                    )}
                    <div className="pt-2">
                        <Link href={route('reports.show', report.id)} className="custom-outline-button block w-full text-center">
                            Open Report
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop view - Table/Grid layout */}
            <div className="hidden md:block">
                {/* Column Headers */}
                <div className="border-border/50 grid grid-cols-8 gap-4 border-b px-4 pt-4 pb-2 font-medium">
                    <div className="text-muted-foreground text-xs">Reference</div>
                    <div className="text-muted-foreground text-xs">Customer</div>
                    <div className="text-muted-foreground text-xs">Property Type</div>
                    <div className="text-muted-foreground text-xs">Address</div>
                    <div className="text-muted-foreground text-xs">Phone</div>
                    <div className="text-muted-foreground text-xs">Time Spent</div>
                    <div className="text-muted-foreground text-xs">Status</div>
                    <div className="text-muted-foreground text-xs">Remarks</div>
                </div>
                <div className="grid grid-cols-8 items-center gap-4 p-4">
                    {/* Column 1: Reference Number */}
                    <div className="text-sm">
                        <span className="bg-muted text-muted-foreground ring-border/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                            #{report.reference_number}
                        </span>
                    </div>

                    {/* Column 2: Customer */}
                    <div className="text-sm font-medium">{report.customer}</div>

                    {/* Column 3: Property Type */}
                    <div className="text-muted-foreground text-sm">{report.property_type}</div>

                    {/* Column 4: Address */}
                    <div className="text-muted-foreground line-clamp-1 text-sm">{report.address}</div>

                    {/* Column 5: Phone Number */}
                    <div className="text-muted-foreground text-sm">{formatPhones(report.customer_phones)}</div>

                    {/* Column 6: Time Spent */}
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" /> {getTimeSpent(report.time_from, report.time_to)}
                    </div>

                    {/* Column 7: Status */}
                    <div>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusBadgeClass(report.status)}`}>
                            {report.status}
                        </span>
                    </div>

                    {/* Column 8: Description/Actions */}
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground line-clamp-1 flex-1 text-sm">{report.description || 'No description'}</span>
                        <Link href={route('reports.show', report.id)} className="custom-outline-button px-2 py-1 text-xs whitespace-nowrap">
                            Open
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
