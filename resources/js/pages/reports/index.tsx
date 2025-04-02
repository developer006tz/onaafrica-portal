import NoData from '@/components/shared/no-data';
import ReportCard from '@/components/shared/report-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem, type Report, type ReportsData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, FileArchive } from 'lucide-react';

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

export default function StaffDailyReportsScreen({ reports, previousReports }: { reports: ReportsData; previousReports: Report[] }) {
    const { auth } = usePage<SharedData>().props;
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
                            <div className="flex flex-col gap-4">
                                <div className="rounded-lg border">
                                    <NoData message={`No reports found for date ${new Date().toLocaleDateString()}`} />
                                </div>

                                {previousReports.length > 0 && (
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-muted-foreground text-lg font-medium">Previous Reports</h3>
                                            <Link href={route('reports.all',auth.user.id)} className="flex items-center text-sm text-primary hover:underline">
                                                View All
                                                <ArrowRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                                            {previousReports.map((report) => (
                                                <ReportCard key={report.id} report={report} isPreviousReport={true} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                                {reports.data.map((report) => (
                                    <ReportCard key={report.id} report={report} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
