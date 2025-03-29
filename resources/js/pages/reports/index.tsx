import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FileArchive } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card';


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


  

export default function StaffDailyReportsScreen() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daily-Reports" />
      <div className="flex h-full flex-1 flex-col gap-4 p-2 sm:p-4">
        <Card className="flex h-full flex-1 flex-col">
          <CardHeader className="p-4 sm:p-6 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
              <CardTitle className="text-xl sm:text-2xl font-semibold">Reports</CardTitle>
              <Link
                href={route('reports.add')}
                className=""
              >
                <Button
                className="flex items-center gap-2"
                variant="default"
              >
                <FileArchive className="h-5 w-5" />
                <span>Add Report</span>
              </Button>
              </Link>
            </div>
          </CardHeader>

          
        </Card>
      </div>
    </AppLayout>
  );
}