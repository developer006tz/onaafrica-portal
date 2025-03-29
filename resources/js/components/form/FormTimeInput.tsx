import { Input } from '@/components/ui/input';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useState } from 'react';

interface FormTimeInputProps {
    label: string;
    error?: string;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
}

export function FormTimeInput({
    label,
    id,
    error,
    description,
    className,
    value,
    onChange,
    disabled,
}: FormTimeInputProps) {
    const [time, setTime] = useState<string>(value || '');

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        if (onChange) {
            onChange(newTime);
        }
    };

    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id || ''}>{label}</FormLabel>
            <div className="relative">
                <Clock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                <Input
                    type="time"
                    id={id}
                    value={time}
                    onChange={handleTimeChange}
                    className={cn('pl-10', className)}
                    disabled={disabled}
                    aria-invalid={!!error}
                />
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
