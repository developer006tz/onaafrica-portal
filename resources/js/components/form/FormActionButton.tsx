import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface FormActionButtonProps extends React.ComponentProps<typeof Button> {
    label: string;
    isProcessing?: boolean;
    processingLabel?: string;
    icon?: LucideIcon;
}

export function FormActionButton({
    label,
    isProcessing = false,
    processingLabel = 'Processing...',
    icon: Icon,
    className,
    ...props
}: FormActionButtonProps) {
    return (
        <Button className={`flex items-center gap-2 ${className || ''}`} disabled={isProcessing} {...props}>
            {Icon && <Icon size={16} />}
            <span>{isProcessing ? processingLabel : label}</span>
        </Button>
    );
}
