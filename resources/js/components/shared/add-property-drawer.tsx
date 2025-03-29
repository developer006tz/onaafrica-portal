import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerOverlay, DrawerPortal, DrawerTrigger } from '@/components/ui/drawer';
import { FormLabel, FormMessage } from '@/lib/form-helper';
import { useForm } from '@inertiajs/react';
import { Building } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function AddPropertyDrawer() {
    const closeRef = useRef<HTMLButtonElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/properties/store', {
            onSuccess: () => {
                reset();
                closeRef.current?.click();
            },
        });
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Building size={16} />
                    <span>Add Property</span>
                </Button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
                <DrawerContent>
                    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8 px-4 py-5">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <FormLabel htmlFor="name">Property name</FormLabel>
                                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <FormMessage>{errors.name}</FormMessage>}
                            </div>
                        </div>
                    </form>

                    <DrawerFooter className="mx-auto flex w-full max-w-3xl flex-col justify-end gap-2">
                        <Button type="submit" disabled={processing} onClick={handleSubmit}>
                            Save Property
                        </Button>
                        <DrawerClose asChild>
                            <Button ref={closeRef} variant="outline">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    );
}
