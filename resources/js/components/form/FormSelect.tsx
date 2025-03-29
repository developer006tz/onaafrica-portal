import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    id?: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    description?: string;
    className?: string;
}

export function FormSelect({
    label,
    id,
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    error,
    description,
    className,
}: FormSelectProps) {
    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id || ''}>{label}</FormLabel>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={id} className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
