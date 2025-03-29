import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { UserPlus } from "lucide-react"
import { useForm } from "@inertiajs/react";
import { FormLabel, FormMessage } from "@/lib/form-helper";
import { Input } from "../ui/input";
import { useRef } from "react";
import { ButonVariant } from "@/types";



export function AddCustomerDrawer({ buttonVariant = "default" }: ButonVariant) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('customers.store'), {
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
              <UserPlus size={16} />
              <span>Add Customer</span>
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-gray-50 dark:bg-black/40 backdrop-blur-sm z-50" />
        
        <DrawerContent className="bg-white dark:bg-white/10">
          <DrawerHeader className="z-40">
            <DrawerTitle className="text-lg font-normal text-center">Add new customer</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-8 min-w-3xl max-w-6xl px-4 mx-auto py-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="name">Customer name</FormLabel>
                  <Input
                    id="name"
                    className="border bg-gray-50 dark:bg-black/40"
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
                    className="border bg-gray-50 dark:bg-black/40"
                    type="text"
                    value={data.contact_person}
                    onChange={e => setData('contact_person', e.target.value)}
                  />
                  {errors.contact_person && <FormMessage>{errors.contact_person}</FormMessage>}
                </div>
                
                <div className=" space-y-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      className="border bg-gray-50 dark:bg-black/40"
                      type="email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <FormMessage>{errors.email}</FormMessage>}
                  </div>
                  
                  <div className=" space-y-2">
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      id="phone"
                      className="border bg-gray-50 dark:bg-black/40"
                      type="text"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                    />
                    {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                  </div>
              </div>
            </form>

            <DrawerFooter className="max-w-3xl mx-auto mb-8 w-full">
              <div className="grid grid-cols-2 gap-4">
                <Button type="submit" disabled={processing} onClick={handleSubmit}>
                  {processing ? "Submitting..." : "Submit"}
                </Button>
                <DrawerClose ref={closeRef} asChild>
                  <Button variant="destructive" >Cancel</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
      </DrawerPortal>
      </Drawer>
  )
}