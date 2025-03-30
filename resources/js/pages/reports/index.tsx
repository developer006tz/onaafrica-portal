import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ReportsData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileArchive } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff',
        href: route('reports.index'),
    },
    {
        title: 'Daily Reports',
        href: route('reports.index'),
    },
];

export default function StaffDailyReportsScreen({ reports,previous_reports }: { reports: ReportsData,previous_reports:ReportsData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daily-Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">Reports</CardTitle>
                            <Link href={route('reports.add')} className="">
                                <Button className="flex items-center gap-2" variant="default">
                                    <FileArchive className="h-5 w-5" />
                                    <span>Add Report</span>
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-6">
                        {reports.data.length === 0 ? (
                            <div className="rounded-lg border">
                                <NoData message={`No reports found for date ${new Date().toLocaleDateString()}`} />
                            </div>
                            // show previous reports
                            
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                                {reports.data.map((report, index) => (
                                    <div
                                        key={report.id}
                                        className="group border-border bg-card text-card-foreground hover:border-border/80 relative overflow-hidden rounded-xl border transition-all hover:shadow-xl"
                                    >
                                        <div className="border-border/50 flex flex-wrap items-center gap-2 border-b p-3 sm:p-5">
                                            <span className="bg-muted text-muted-foreground ring-border/20 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                                                Report #{report.id}
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
                                                    <h3 className="text-foreground mb-1 text-base font-semibold sm:mb-2 sm:text-lg">
                                                        {report.customer}
                                                    </h3>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm">{report.address}</p>
                                                </div>
                                                <div className="w-full sm:ml-4 sm:w-auto sm:flex-shrink-0">
                                                    <Link
                                                        href={route('reports.show', report.id)}
                                                        className="custom-outline-button"
                                                    >
                                                        Open Report
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
