import { Input } from '@/components/ui/input';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import React from 'react';

interface FormInputProps extends React.ComponentProps<typeof Input> {
    label: string;
    error?: string;
    description?: string;
}

export function FormInput({ label, id, error, description, className, ...props }: FormInputProps) {
    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id || ''}>{label}</FormLabel>
            <Input id={id} className={className} aria-invalid={!!error} {...props} />
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
