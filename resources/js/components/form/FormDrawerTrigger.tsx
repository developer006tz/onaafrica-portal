import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import { ButonVariant } from '@/types';
import { LucideIcon } from 'lucide-react';

interface FormDrawerTriggerProps extends ButonVariant {
    label: string;
    icon: LucideIcon;
    className?: string;
}

export function FormDrawerTrigger({ label, icon: Icon, buttonVariant = 'default', className }: FormDrawerTriggerProps) {
    return (
        <DrawerTrigger asChild>
            <Button variant={buttonVariant} className={`flex items-center gap-2 ${className || ''}`}>
                <Icon size={16} />
                <span>{label}</span>
            </Button>
        </DrawerTrigger>
    );
}
