import { DatePicker } from '@/components/ui/date-picker';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import { format } from 'date-fns';
import { useState } from 'react';

interface FormDateInputProps {
    label: string;
    error?: string;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    id?: string;
    disabled?: boolean;
}

export function FormDateInput({ label, id, error, description, className, value, onChange, disabled }: FormDateInputProps) {
    const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id || ''}>{label}</FormLabel>
            <DatePicker
                date={date}
                setDate={(newDate) => {
                    setDate(newDate);
                    if (onChange) {
                        onChange(newDate ? format(newDate, 'yyyy-MM-dd') : '');
                    }
                }}
                className={className}
                disabled={disabled}
            />
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
