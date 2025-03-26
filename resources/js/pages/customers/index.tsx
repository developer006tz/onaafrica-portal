import AppLayout from '@/layouts/app-layout';
import { Customer, type BreadcrumbItem } from '@/types';
import { Head,Link } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { AddCustomerDrawer } from '@/components/shared/add-customer-drawer';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Customers',
    href: '/customers',
  },
];

interface CustomerProps {
  customers: {
    data: Customer[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}
  

export default function UserScreen({ customers }: CustomerProps) {


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Staffs" />
      <Card className="flex h-full flex-1 flex-col gap-4 m-4">
      <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-2xl font-semibold">Customers</CardTitle>
            <AddCustomerDrawer />
          </div>
        </CardHeader>
        
      </Card>
    </AppLayout>
  );
}