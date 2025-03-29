import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import { Plus, Trash } from 'lucide-react';

interface FormPhoneInputProps {
    label: string;
    phones: string[];
    onAddPhone: () => void;
    onRemovePhone: (index: number) => void;
    onUpdatePhone: (index: number, value: string) => void;
    error?: string;
    description?: string;
}

export function FormPhoneInput({ label, phones, onAddPhone, onRemovePhone, onUpdatePhone, error, description }: FormPhoneInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <FormLabel htmlFor="phone-input">{label}</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={onAddPhone} className="flex items-center gap-1">
                    <Plus size={16} />
                    <span>Add Phone</span>
                </Button>
            </div>
            <div className="space-y-2">
                {phones.map((phone, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            id={`phone-input-${index}`}
                            value={phone}
                            onChange={(e) => onUpdatePhone(index, e.target.value)}
                            placeholder="Enter phone number"
                        />
                        {phones.length > 1 && (
                            <Button type="button" variant="outline" size="icon" onClick={() => onRemovePhone(index)}>
                                <Trash size={16} />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    );
}
