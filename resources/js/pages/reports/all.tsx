import GlobalPaginator from '@/components/shared/global-paginator';
import NoData from '@/components/shared/no-data';
import ReportCard from '@/components/shared/report-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem, type ReportsData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff',
        href: route('reports.index'),
    },
    {
        title: 'Full Reports',
        href: route('reports.index'),
    },
];

export default function StaffAllReportsScreen({ reports }: { reports: ReportsData }) {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Reports | ${auth.user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">
                                Reports for <span className="text-primary animate-pulse rounded-md px-2 py-1 font-bold">{auth.user.name}</span>{' '}
                            </CardTitle>
                            <Link href={route('reports.index')} className="">
                                <Button className="flex items-center gap-2" variant="default">
                                    <ArrowLeft className="h-5 w-5" />
                                    <span>Go Back</span>
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
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                                {reports.data.map((report) => (
                                    <ReportCard key={report.id} report={report} />
                                ))}
                            </div>
                        )}
                    </CardContent>

                    {/* pagination  */}
                    <GlobalPaginator data={reports} />
                    {/* pagination  */}
                </Card>
            </div>
        </AppLayout>
    );
}
