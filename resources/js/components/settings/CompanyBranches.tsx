import { FormActionButton, FormFileInput, FormInput, FormTextarea } from '@/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyBranch } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

interface BranchFormData {
    name: string;
    address: string;
    address_two: string | null;
    phones: string;
    city: string;
    email: string | null;
    contact_person: string | null;
    contact_number: string | null;
    stamp: File | null;
    _method: 'put';
}

function BranchForm({ branch }: { branch: CompanyBranch }) {
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm<BranchFormData>({
        name: branch.name || '',
        address: branch.address || '',
        address_two: branch.address_two || '',
        phones: Array.isArray(branch.phones) ? branch.phones.join(', ') : '',
        city: branch.city || '',
        email: branch.email || '',
        contact_person: branch.contact_person || '',
        contact_number: branch.contact_number || '',
        stamp: null,
        _method: 'put',
    });

    const [stampPreview, setStampPreview] = useState<string | null>(branch.stamp ? `/storage/${branch.stamp}` : null);
    const currentStamp = data.stamp ? URL.createObjectURL(data.stamp) : stampPreview;

    useEffect(() => {
        // Clean up object URL
        return () => {
            if (data.stamp && currentStamp && currentStamp.startsWith('blob:')) {
                URL.revokeObjectURL(currentStamp);
            }
        };
    }, [data.stamp, currentStamp]);

    const handleFileChange = (files: File[] | null) => {
        setData('stamp', files?.[0] || null);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('company.branch.update', { id: branch.id }), {
            preserveScroll: true,
            onSuccess: () => reset('stamp'),
            onError: () => {
                if (errors.stamp && data.stamp) {
                    setData('stamp', null);
                }
            },
        });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Update Branch: {branch.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormInput
                            id={`name-${branch.id}`}
                            label="Branch Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="Branch Name"
                            required
                        />
                        <FormInput
                            id={`city-${branch.id}`}
                            label="City"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            error={errors.city}
                            placeholder="City"
                            required
                        />
                    </div>

                    <FormTextarea
                        id={`address-${branch.id}`}
                        label="Address Line 1"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        error={errors.address}
                        placeholder="Primary Address"
                        required
                    />

                    <FormTextarea
                        id={`address_two-${branch.id}`}
                        label="Address Line 2 (Optional)"
                        value={data.address_two || ''}
                        onChange={(e) => setData('address_two', e.target.value)}
                        error={errors.address_two}
                        placeholder="Additional Address Information"
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormInput
                            id={`email-${branch.id}`}
                            label="Email (Optional)"
                            type="email"
                            value={data.email || ''}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            placeholder="branch@example.com"
                        />
                        <FormInput
                            id={`phones-${branch.id}`}
                            label="Phone Numbers (comma-separated)"
                            value={data.phones}
                            onChange={(e) => setData('phones', e.target.value)}
                            error={errors.phones}
                            placeholder="+255xxxxxxxxx, +255xxxxxxxxx"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormInput
                            id={`contact_person-${branch.id}`}
                            label="Contact Person (Optional)"
                            value={data.contact_person || ''}
                            onChange={(e) => setData('contact_person', e.target.value)}
                            error={errors.contact_person}
                            placeholder="Contact Person Name"
                        />
                        <FormInput
                            id={`contact_number-${branch.id}`}
                            label="Contact Number (Optional)"
                            value={data.contact_number || ''}
                            onChange={(e) => setData('contact_number', e.target.value)}
                            error={errors.contact_number}
                            placeholder="Contact Person Phone"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Branch Stamp (Optional)</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                <div className="flex flex-col space-y-3">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Stamp</h4>
                                    {currentStamp ? (
                                        <div className="relative flex h-[150px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                            <img src={currentStamp} alt="Current Stamp" className="max-h-full max-w-full object-contain" />
                                        </div>
                                    ) : (
                                        <div className="flex h-[150px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">No stamp uploaded</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-3">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload New Stamp</h4>
                                    <FormFileInput
                                        label=""
                                        value={data.stamp ? [data.stamp] : null}
                                        onChange={handleFileChange}
                                        error={errors.stamp}
                                        description="Select a new stamp image"
                                        acceptedTypes=".png,.jpg,.jpeg,.webp"
                                        helperText="PNG, JPG, JPEG or WEBP (Max 2MB)"
                                        maxFiles={1}
                                        maxSize={2 * 1024 * 1024}
                                        id={`stamp-${branch.id}`}
                                        className="block w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FormActionButton label="Update Branch" isProcessing={processing} processingLabel="Updating..." icon={Check} />
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out duration-300"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out duration-200"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default function CompanyBranches() {
    const { branches } = usePage<{ branches: CompanyBranch[] }>().props;

    if (!branches || branches.length === 0) {
        return <p className="text-gray-500 dark:text-gray-400">No company branches found.</p>;
    }

    return (
        <div className="my-4 space-y-6">
            {branches.map((branch) => (
                <BranchForm key={branch.id} branch={branch} />
            ))}
        </div>
    );
}
