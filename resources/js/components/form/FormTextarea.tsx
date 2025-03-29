import { Textarea } from '@/components/ui/textarea';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import React from 'react';

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
    label: string;
    error?: string;
    description?: string;
}

export function FormTextarea({ label, id, error, description, className, ...props }: FormTextareaProps) {
    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id || ''}>{label}</FormLabel>
            <Textarea id={id} className={className} aria-invalid={!!error} {...props} />
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
