import AppLayout from '@/layouts/app-layout';
import { Roles, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormFileInput } from '@/components/form/FormFileInput';
import { FormInput, FormSelect } from '@/components/form';

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
                <FormInput
                    id='name'
                    label="Full Name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="Full name"
                    />
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                  <FormInput
                    id='email'
                    label="Email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="email@example.com"
                    type='email'
                    />
                </div>
                
                <div className="col-span-6 space-y-2">
                  <FormInput
                    id='phone'
                    label="Phone"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    error={errors.phone}
                    placeholder="07xxxxxx"
                    type='tel'
                    />
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                <FormSelect
                  label="Role"
                  id="role_id"
                  options={roles.map(role => ({ value: role.id, label: role.name }))}
                  value={data.role_id}
                  onChange={(value) => setData('role_id', value)}
                  placeholder="Choose Role"
                  error={errors.role_id}
                />
                </div>
                
                <div className="col-span-6 space-y-2">
                  <FormInput
                    id='staff_number'
                    label="Staff ID"
                    value={data.staff_number}
                    onChange={e => setData('staff_number', e.target.value)}
                    error={errors.staff_number}
                    placeholder="ONA-XXXX"
                    />
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