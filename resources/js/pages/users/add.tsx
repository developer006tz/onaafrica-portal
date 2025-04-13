import AppLayout from '@/layouts/app-layout';
import { Roles, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FormFileInput } from '@/components/form/FormFileInput'; // Import the component
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Staffs', href: '/staffs' },
  { title: 'Add New', href: '/staffs/add' },
];

interface AddUserProps {
  roles: Roles
}

export default function AddStaffScreen({ roles }: AddUserProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    role_id: '',
    staff_number: '',
    photo: null as File | null
  });

  const handleFileChange = (files: File[] | null) => {
    // Update form data with first file or null
    setData('photo', files?.[0] || null);
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/staffs/store');
  }
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Staffs-Add" />
      <Card className="flex h-full m-4 flex-1 flex-col gap-4">
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto py-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Full name"
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <FormMessage>{errors.name}</FormMessage>}
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email" 
                    placeholder="your email"
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
                    placeholder="07xxxxxx"
                    type="text"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                  />
                  {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                  <FormLabel htmlFor="role_id">Role</FormLabel>
                  <Select 
                    value={data.role_id} 
                    onValueChange={(value) => setData('role_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select user role</FormDescription>
                  {errors.role_id && <FormMessage>{errors.role_id}</FormMessage>}
                </div>
                
                <div className="col-span-6 space-y-2">
                  <FormLabel htmlFor="staff_number">Staff ID</FormLabel>
                  <Input 
                    id="staff_number"
                    placeholder="ONA-XXXX"
                    type="text"
                    value={data.staff_number}
                    onChange={e => setData('staff_number', e.target.value)}
                  />
                  {errors.staff_number && <FormMessage>{errors.staff_number}</FormMessage>}
                </div>
              </div>
              
              <div className="space-y-2">
                <FormFileInput
                label="Photo"
                value={data.photo ? [data.photo] : null}
                onChange={handleFileChange}
                error={errors.photo}
                description="Select Image to Upload"
                acceptedTypes=".png,.jpg,.jpeg,.webp"
                helperText="PNG, JPG, JPEG or WEBP"
                maxFiles={1}
                maxSize={2 * 1024 * 1024}
                id="photo"
              />
              </div>
            </div>
            
            <Button type="submit" disabled={processing}>
              {processing ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}