import AppLayout from '@/layouts/app-layout';
import { Roles, type BreadcrumbItem, } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { useState } from "react";
// Don't import form components that rely on react-hook-form context
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/ui/file-upload";
import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Staffs',
    href: '/staffs',
  },
  {
    title: 'Add New',
    href: '/staffs/add',
  },
];

interface AddUserProps {
  roles: Roles
}



export default function AddStaffScreen({ roles }: AddUserProps) {

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  
  // Use Inertia's useForm
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    role_id: '',
    staff_number: '',
    photo: null as File | null
  });

  function handleFileChange(files: File[] | null) {
    setFiles(files);
    if (files && files.length > 0) {
      setData('photo', files[0]);
    } else {
      setData('photo', null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/staffs/store', {
      onSuccess: () => {
        //
      },
    });
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
                <FormLabel htmlFor="photo">Photo</FormLabel>
                <FileUploader
                  value={files}
                  onValueChange={handleFileChange}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className='text-gray-500 w-10 h-10' />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
                <FormDescription>Select Image to Upload</FormDescription>
                {errors.photo && <FormMessage>{errors.photo}</FormMessage>}
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