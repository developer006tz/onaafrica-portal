import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FormLabel, FormMessage } from '@/lib/form-helper';
import { useForm } from '@inertiajs/react';
import { Building } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ButonVariant } from '@/types';

export function AddPropertyDrawer( { buttonVariant='default' }: ButonVariant) {
    const closeRef = useRef<HTMLButtonElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('properties.store'), {
            onSuccess: () => {
                reset();
                closeRef.current?.click();
            },
        });
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={buttonVariant} className="flex items-center gap-2">
                    <Building size={16} />
                    <span>Add Property</span>
                </Button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
                <DrawerContent className="bg-white/10">
                    <DrawerHeader className="z-40">
                        <DrawerTitle className="text-lg font-normal text-center">Add new Property</DrawerTitle>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="space-y-8 min-w-3xl max-w-6xl px-4 mx-auto py-5">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <FormLabel htmlFor="name">Property name</FormLabel>
                                <Input 
                                 id="name"
                                 type="text" 
                                 value={data.name} 
                                 onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <FormMessage>{errors.name}</FormMessage>}
                            </div>
                        </div>
                    </form>

                    <DrawerFooter className="max-w-3xl mx-auto mb-4 w-full">
                    <div className="grid grid-cols-2 gap-4">
                        <Button type="submit" disabled={processing} onClick={handleSubmit}>
                        {processing ? "Submitting..." : "Save Property"}
                        </Button>
                        <DrawerClose ref={closeRef} asChild>
                        <Button variant="destructive" >Cancel</Button>
                        </DrawerClose>
                    </div>
                    </DrawerFooter>


                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    );
}
