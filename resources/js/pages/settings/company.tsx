import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

import { FormActionButton, FormFileInput, FormInput } from '@/components/form';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Check } from 'lucide-react';
import CompanyBranches from '@/components/settings/CompanyBranches';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Company Settings',
        href: '/settings/company',
    },
];

export default function CompanyUpdate() {
    const { company } = usePage<{ company: any }>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: company.name,
        tin: company.tin,
        vrn: company.vrn,
        country: company.country,
        logo: null as File | null,
    });


    const logoPreview = data.logo ? URL.createObjectURL(data.logo) : null;

    const currentLogo = company.logo || logoPreview;

    useEffect(() => {
        return () => {
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    const handleFileChange = (files: File[] | null) => {
        setData('logo', files?.[0] || null);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('company.update', { id: company.id }), {
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
                                id="name"
                                label="Company Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Company Name"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormInput
                                id="tin"
                                label="TIN Number"
                                value={data.tin}
                                onChange={(e) => setData('tin', e.target.value)}
                                error={errors.tin}
                                placeholder="Company Tin"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormInput
                                id="vrn"
                                label="VRN Number"
                                value={data.vrn}
                                onChange={(e) => setData('vrn', e.target.value)}
                                error={errors.vrn}
                                placeholder="Company VRN"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormInput
                                id="country"
                                label="Country"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                error={errors.country}
                                placeholder="Country"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Company Logo</h3>
                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                    <div className="flex flex-col space-y-3">
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Logo</h4>
                                        {currentLogo ? (
                                            <div className="relative flex h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                                <img 
                                                    src={currentLogo} 
                                                    alt="Current Logo" 
                                                    className="max-h-full max-w-full object-contain" 
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">No logo uploaded</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-3">
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload New Logo</h4>
                                        <FormFileInput
                                            label=""
                                            value={data.logo ? [data.logo] : null}
                                            onChange={handleFileChange}
                                            error={errors.logo}
                                            description="Select a new logo to replace the current one"
                                            acceptedTypes="image/png,image/jpg,image/jpeg,image/webp"
                                            helperText="PNG, JPG, JPEG or WEBP"
                                            maxFiles={1}
                                            maxSize={2 * 1024 * 1024}
                                            id="logo"
                                            className="block w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <FormActionButton label="Submit Changes" isProcessing={processing} processingLabel="Saving Changes" icon={Check} />
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

                    <HeadingSmall title="Company Branches Information" description="Update company Branches Informations" />

                    <CompanyBranches />

                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
