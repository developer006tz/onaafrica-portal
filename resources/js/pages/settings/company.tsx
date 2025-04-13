import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

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
    });

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
                            <Label htmlFor="name">Company Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Company Name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tin">TIN</Label>

                            <Input
                                id="tin"
                                className="mt-1 block w-full"
                                value={data.tin}
                                onChange={(e) => setData('tin', e.target.value)}
                                placeholder="Tax Identification Number"
                            />

                            <InputError className="mt-2" message={errors.tin} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="vrn">VRN</Label>

                            <Input
                                id="vrn"
                                className="mt-1 block w-full"
                                value={data.vrn}
                                onChange={(e) => setData('vrn', e.target.value)}
                                placeholder="VAT Registration Number"
                            />

                            <InputError className="mt-2" message={errors.vrn} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>

                            <Input
                                id="country"
                                className="mt-1 block w-full"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                placeholder="Country"
                            />

                            <InputError className="mt-2" message={errors.country} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

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
