import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    placeholder = 'Select time',
}: FormTimeInputProps) {
    const [time, setTime] = useState<string>(value || '');
    const [open, setOpen] = useState(false);

    /* Parse hours and minutes from time string (format: HH:MM) */
    const [hours, setHours] = useState<number>(() => {
        if (time) {
            const [hours] = time.split(':');
            return parseInt(hours, 10);
        }
        return 12; /* Default hour */
    });

    const [minutes, setMinutes] = useState<number>(() => {
        if (time) {
            const [, minutes] = time.split(':');
            return parseInt(minutes, 10);
        }
        return 0; /* Default minute */
    });

    /* Update the time string when hours or minutes change */
    useEffect(() => {
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const newTime = `${formattedHours}:${formattedMinutes}`;

        /* Only update if time has actually changed */
        if (newTime !== time) {
            setTime(newTime);
            if (onChange) {
                onChange(newTime);
            }
        }
    }, [hours, minutes, onChange, time]);

    /* Generate arrays for hours and minutes for the picker */
    const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    /* Format time for display */
    const formatTimeForDisplay = (timeString: string) => {
        if (!timeString) return placeholder;

        const [hours, minutes] = timeString.split(':').map(Number);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
    };

    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id || ''}>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn('w-full justify-start text-left font-normal', !time && 'text-muted-foreground', className)}
                        disabled={disabled}
                        aria-invalid={!!error}
                    >
                        <Clock className="mr-2 h-4 w-4 shrink-0" />
                        {formatTimeForDisplay(time)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex gap-2 p-2">
                        <div className="flex flex-col items-center">
                            <div className="py-1 text-sm font-medium">Hour</div>
                            <div className="scrollbar-thin flex h-52 flex-col items-center overflow-y-auto">
                                {hoursArray.map((hour) => (
                                    <div
                                        key={hour}
                                        className={cn(
                                            'hover:bg-accent cursor-pointer rounded px-3 py-1',
                                            hours === hour && 'bg-primary text-primary-foreground',
                                        )}
                                        onClick={() => {
                                            setHours(hour);
                                        }}
                                    >
                                        {hour.toString().padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-1 text-sm font-medium">Minute</div>
                            <div className="scrollbar-thin flex h-52 flex-col items-center overflow-y-auto">
                                {minutesArray.map((minute) => (
                                    <div
                                        key={minute}
                                        className={cn(
                                            'hover:bg-accent cursor-pointer rounded px-3 py-1',
                                            minutes === minute && 'bg-primary text-primary-foreground',
                                        )}
                                        onClick={() => {
                                            setMinutes(minute);
                                            setOpen(false);
                                        }}
                                    >
                                        {minute.toString().padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
