import { type Report } from '@/types';
import { Link } from '@inertiajs/react';

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
            <div className="border-border/50 flex flex-wrap items-center gap-2 border-b p-3 sm:p-5">
                <span className="bg-muted text-muted-foreground ring-border/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                    Report #{report.reference_number}
                </span>
                <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                        report.status === 'COMPLETE'
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset'
                            : report.status === 'PENDING'
                              ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 ring-inset'
                              : 'bg-muted text-muted-foreground ring-border/20 ring-1 ring-inset'
                    }`}
                >
                    {report.status}
                </span>
                <span className="text-muted-foreground ml-auto text-xs font-medium sm:text-sm">{report.date}</span>
            </div>
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="mb-3 flex-1 sm:mb-0">
                        <h3 className="text-foreground mb-1 text-base font-semibold sm:mb-2 sm:text-lg">{report.customer}</h3>
                        <p className="text-muted-foreground line-clamp-2 text-sm">{report.address}</p>
                    </div>
                    <div className="w-full sm:ml-4 sm:w-auto sm:flex-shrink-0">
                        <Link href={route('reports.show', report.id)} className="custom-outline-button">
                            Open Report
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
