import NoData from '@/components/shared/no-data';
import ReportCard from '@/components/shared/report-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem, type ReportsData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {  ArrowLeft } from 'lucide-react';

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

export default function StaffAllReportsScreen({ reports }: { reports: ReportsData; }) {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Reports | ${auth.user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader className="p-4 pb-0 sm:p-6">
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">Reports for <span className='text-primary px-2 py-1 rounded-md font-bold animate-pulse'>{auth.user.name}</span> </CardTitle>
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
                <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-2 sm:px-4 py-3 sm:py-4 sm:flex-row">
                    <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      Showing <span className="font-medium">{(reports.current_page - 1) * reports.per_page + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(reports.current_page * reports.per_page, reports.total)}</span>{' '}
                      of <span className="font-medium">{reports.total}</span> results
                    </div>
                    <Pagination className="flex flex-wrap justify-center sm:justify-end gap-1">
                      {reports.links.map((link, i) => (
                        link.url ? (
                          <Link
                            key={i}
                            href={link.url}
                            className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex h-7 min-w-7 sm:h-8 sm:min-w-8 items-center justify-center rounded-md border border-input px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                          >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                          </Link>
                        ) : (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            disabled
                            className="h-7 min-w-7 sm:h-8 sm:min-w-8 px-2 sm:px-3 py-1 text-xs sm:text-sm opacity-50 cursor-not-allowed"
                          >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                          </Button>
                        )
                      ))}
                    </Pagination>
                  </div>
                {/* pagination  */}
                </Card>

               
            </div>
        </AppLayout>
    );
}
