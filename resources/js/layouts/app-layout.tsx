import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Toaster, toast } from 'sonner';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { type BreadcrumbItem } from '@/types';


interface PageProps {
    flash: {
      success?: string;
      error?: string;
      [key: string]: string | undefined;
    };
    [key: string]: unknown;
  }
interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { flash,errors } = usePage<PageProps>().props;
  
    useEffect(() => {
      if (flash?.success) {
        toast.success(flash.success);
      }
      if (flash?.error) {
        toast.error(flash.error);
      }
      if (flash?.warning) {
        toast.error(flash.warning);
      }
      if (errors) {
        for (const [key, value] of Object.entries(errors)) {
          if (typeof value === 'string') {
            toast.error(value);
          }
        }
      }
    }, [flash, errors]);
  
    return (
      <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Toaster position='top-right' richColors />
        {children}
      </AppLayoutTemplate>
    );
  }
