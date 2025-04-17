import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface FormTimeInputAdvancedProps {
    label: string;
    error?: string;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
    use12HourFormat?: boolean;
}

type TimeFormat = '12h' | '24h';
type Period = 'AM' | 'PM';

interface TimePreset {
    label: string;
    value: string;
}

export function FormTimeInputAdvanced({
    label,
    id,
    error,
    description,
    className,
    value,
    onChange,
    disabled,
    placeholder = 'Select time',
    use12HourFormat = false,
}: FormTimeInputAdvancedProps) {
    const [time, setTime] = useState<string>(value || '');
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState<TimeFormat>(use12HourFormat ? '12h' : '24h');
    const [period, setPeriod] = useState<Period>('AM');

    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);

    /* Parse hours and minutes from time string (format: HH:MM) */
    const [hours, setHours] = useState<number>(() => {
        if (time) {
            const [hoursStr] = time.split(':');
            const parsedHours = parseInt(hoursStr, 10);

            if (format === '12h') {
                if (parsedHours === 0) return 12;
                if (parsedHours > 12) {
                    setPeriod('PM');
                    return parsedHours - 12;
                }
                if (parsedHours === 12) {
                    setPeriod('PM');
                }
                return parsedHours;
            }

            return parsedHours;
        }
        return format === '12h' ? 12 : 0; /* Default hour */
    });

    const [minutes, setMinutes] = useState<number>(() => {
        if (time) {
            const [, minutesStr] = time.split(':');
            return parseInt(minutesStr, 10);
        }
        return 0; /* Default minute */
    });

    /* Scroll to selected time values when popover opens */
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (hourRef.current) {
                    const selectedHourElement = hourRef.current.querySelector('[data-selected=true]');
                    if (selectedHourElement) {
                        selectedHourElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
                    }
                }

                if (minuteRef.current) {
                    const selectedMinuteElement = minuteRef.current.querySelector('[data-selected=true]');
                    if (selectedMinuteElement) {
                        selectedMinuteElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
                    }
                }
            }, 100);
        }
    }, [open]);

    /* Update the time string when hours, minutes, or period change */
    useEffect(() => {
        let adjustedHours = hours;

        if (format === '12h') {
            if (period === 'PM' && hours < 12) {
                adjustedHours = hours + 12;
            } else if (period === 'AM' && hours === 12) {
                adjustedHours = 0;
            }
        }

        const formattedHours = adjustedHours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const newTime = `${formattedHours}:${formattedMinutes}`;

        /* Only update if time has actually changed */
        if (newTime !== time) {
            setTime(newTime);
            if (onChange) {
                onChange(newTime);
            }
        }
    }, [hours, minutes, period, format, onChange, time]);

    /* Generate arrays for hours and minutes for the picker */
    const hoursArray = Array.from({ length: format === '12h' ? 12 : 24 }, (_, i) => (format === '12h' ? (i === 0 ? 12 : i) : i));

    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    /* Common time presets */
    const timePresets: TimePreset[] = [
        { label: 'Morning', value: '09:00' },
        { label: 'Noon', value: '12:00' },
        { label: 'Afternoon', value: '15:00' },
        { label: 'Evening', value: '18:00' },
        { label: 'Night', value: '21:00' },
    ];

    /* Apply a preset time */
    const applyPreset = (preset: TimePreset) => {
        const [presetHours, presetMinutes] = preset.value.split(':').map(Number);

        if (format === '12h') {
            if (presetHours >= 12) {
                setPeriod('PM');
                setHours(presetHours === 12 ? 12 : presetHours - 12);
            } else {
                setPeriod('AM');
                setHours(presetHours === 0 ? 12 : presetHours);
            }
        } else {
            setHours(presetHours);
        }

        setMinutes(presetMinutes);
        setOpen(false);
    };

    /* Format time for display */
    const formatTimeForDisplay = (timeString: string) => {
        if (!timeString) return placeholder;

        const [hoursStr, minutesStr] = timeString.split(':');
        const parsedHours = parseInt(hoursStr, 10);
        const parsedMinutes = parseInt(minutesStr, 10);

        if (format === '12h') {
            const displayHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
            const ampm = parsedHours >= 12 ? 'PM' : 'AM';
            return `${displayHours}:${parsedMinutes.toString().padStart(2, '0')} ${ampm}`;
        }

        return `${parsedHours.toString().padStart(2, '0')}:${parsedMinutes.toString().padStart(2, '0')}`;
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
                <PopoverContent className="w-auto p-4" align="start">
                    <div className="space-y-4">
                        {/* Format toggle */}
                        <div className="flex justify-end">
                            <div className="inline-flex items-center rounded-md border p-1 text-xs">
                                <button
                                    type="button"
                                    className={cn(
                                        'rounded px-2 py-1 transition-colors',
                                        format === '24h' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                    )}
                                    onClick={() => setFormat('24h')}
                                >
                                    24h
                                </button>
                                <button
                                    type="button"
                                    className={cn(
                                        'rounded px-2 py-1 transition-colors',
                                        format === '12h' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                    )}
                                    onClick={() => setFormat('12h')}
                                >
                                    12h
                                </button>
                            </div>
                        </div>

                        {/* Time picker */}
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="py-1 text-sm font-medium">Hour</div>
                                <div
                                    ref={hourRef}
                                    className="scrollbar-thin flex h-40 flex-col items-center overflow-y-auto rounded-md border p-1 shadow-sm"
                                >
                                    {hoursArray.map((hour) => (
                                        <div
                                            key={hour}
                                            data-selected={hours === hour}
                                            className={cn(
                                                'hover:bg-accent w-14 cursor-pointer rounded-md px-3 py-1.5 text-center transition-colors',
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
                                <div
                                    ref={minuteRef}
                                    className="scrollbar-thin flex h-40 flex-col items-center overflow-y-auto rounded-md border p-1 shadow-sm"
                                >
                                    {minutesArray.map((minute) => (
                                        <div
                                            key={minute}
                                            data-selected={minutes === minute}
                                            className={cn(
                                                'hover:bg-accent w-14 cursor-pointer rounded-md px-3 py-1.5 text-center transition-colors',
                                                minutes === minute && 'bg-primary text-primary-foreground',
                                            )}
                                            onClick={() => {
                                                setMinutes(minute);
                                            }}
                                        >
                                            {minute.toString().padStart(2, '0')}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {format === '12h' && (
                                <div className="flex flex-col items-center">
                                    <div className="py-1 text-sm font-medium">Period</div>
                                    <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-md border p-1 shadow-sm">
                                        <div
                                            className={cn(
                                                'hover:bg-accent w-14 cursor-pointer rounded-md px-3 py-2 text-center transition-colors',
                                                period === 'AM' && 'bg-primary text-primary-foreground',
                                            )}
                                            onClick={() => setPeriod('AM')}
                                        >
                                            AM
                                        </div>
                                        <div
                                            className={cn(
                                                'hover:bg-accent w-14 cursor-pointer rounded-md px-3 py-2 text-center transition-colors',
                                                period === 'PM' && 'bg-primary text-primary-foreground',
                                            )}
                                            onClick={() => setPeriod('PM')}
                                        >
                                            PM
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick presets */}
                        <div className="space-y-2">
                            <div className="text-sm font-medium">Quick select</div>
                            <div className="flex flex-wrap gap-2">
                                {timePresets.map((preset) => (
                                    <button
                                        key={preset.value}
                                        type="button"
                                        className="hover:bg-accent rounded-md border px-2.5 py-1 text-xs transition-colors"
                                        onClick={() => applyPreset(preset)}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" onClick={() => setOpen(false)}>
                                Apply
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
