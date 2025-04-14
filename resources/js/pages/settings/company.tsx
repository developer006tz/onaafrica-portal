import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { FormActionButton, FormFileInput, FormInput } from '@/components/form';
import { Check } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Company Settings',
        href: '/settings/company',
    },
];

export default function CompanyUpdate() {
    const { company } = usePage<{ company: any }>().props;

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: company.name,
        tin: company.tin,
        vrn: company.vrn,
        country: company.country,
        logo: company.logo || null,
    });

    const handleFileChange = (files: File[] | null) => {
        setData('logo', files?.[0] || null);
      };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('company.update', { id: company.id }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company Settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Company Information" description="Update company Informations" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            
                            <FormInput
                                id='name'
                                label="Company Name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Company Name"
                                className='mt-1 block w-full'
                             />

                        </div>

                        <div className="grid gap-2">
                        <FormInput
                            id='tin'
                            label="TIN Number"
                            value={data.tin}
                            onChange={e => setData('tin', e.target.value)}
                            error={errors.tin}
                            placeholder="Company Tin"
                            className='mt-1 block w-full'
                            />
                        </div>

                        <div className="grid gap-2">
                        <FormInput
                            id='vrn'
                            label="VRN Number"
                            value={data.vrn}
                            onChange={e => setData('vrn', e.target.value)}
                            error={errors.vrn}
                            placeholder="Company VRN"
                            className='mt-1 block w-full'
                            />
                        </div>

                        <div className="grid gap-2">
                        <FormInput
                            id='country'
                            label="Country"
                            value={data.country}
                            onChange={e => setData('country', e.target.value)}
                            error={errors.country}
                            placeholder="Country"
                            className='mt-1 block w-full'
                        />
                        </div>

                        <div className="space-y-2">
                            <FormFileInput
                            label="Company Logo"
                            value={data.logo ? [data.logo] : null}
                            onChange={handleFileChange}
                            error={errors.logo}
                            description="Select Image to Upload"
                            acceptedTypes=".png,.jpg,.jpeg,.webp"
                            helperText="PNG, JPG, JPEG or WEBP"
                            maxFiles={1}
                            maxSize={2 * 1024 * 1024}
                            id="logo"
                            className='mt-1 block w-full'
                        />
                        </div>

                        <div className="flex items-center gap-4">
                            <FormActionButton
                              label='Submit Changes'
                              isProcessing={processing}
                              processingLabel='Saving Changes'
                              icon={Check}
                             />
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
