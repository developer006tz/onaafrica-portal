import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    DrawerPortal,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { UserPlus } from "lucide-react"
import { useForm } from "@inertiajs/react";
import {  FormLabel, FormMessage } from "@/lib/form-helper";
import { Input } from "../ui/input";
import { useRef } from "react";

  
  export function AddCustomerDrawer() {
    const closeRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
      name: '',
      contact_person: '',
      email: '',
      phone: '',
    });

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      post('/customers/store', {
        onSuccess: () => {
          reset();
          closeRef.current?.click();
        },
      });
    }
    
    return (
        <Drawer>
        <DrawerTrigger>
        <Button className="flex items-center gap-2">
                <UserPlus size={16} />
                <span>Add Customer</span>
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <DrawerContent>
            <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl px-4 mx-auto py-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="name">Customer name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <FormMessage>{errors.name}</FormMessage>}
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="contact_person">Contact Person</FormLabel>
                    <Input
                      id="contact_person"
                      type="text"
                      value={data.contact_person}
                      onChange={e => setData('contact_person', e.target.value)}
                    />
                    {errors.contact_person && <FormMessage>{errors.contact_person}</FormMessage>}
                  </div>
                  
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 space-y-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                      />
                      {errors.email && <FormMessage>{errors.email}</FormMessage>}
                    </div>
                    
                    <div className="col-span-6 space-y-2">
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <Input
                        id="phone"
                        type="text"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                      />
                      {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                    </div>
                  </div>
                </div>
              </form>

              <DrawerFooter className="max-w-3xl mx-auto flex flex-col w-full justify-end gap-2">
                <Button type="submit" disabled={processing} onClick={handleSubmit}>
                  {processing ? "Submitting..." : "Submit"}
                </Button>
                <DrawerClose ref={closeRef} asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
        </DrawerPortal>
        </Drawer>
    )
  }