<?php

use App\Models\Company;
use App\Models\Role;

function roles()
{
    return Role::get(['id', 'name'])->toArray();

}

function isAdmin()
{
    $user = auth()->user();

    return in_array($user->role->name, ['it', 'admin', 'manager']);
}

function assetDomain()
{
    return 'https://assets.onaafricainvestment.com/onaafrica-portal/';
}

function uploadFile($file, $path = 'uploads')
{
    try {
        if ($file && $file->isValid()) {
            $fileName = uniqid().'.'.$file->getClientOriginalExtension();

            $filePath = $file->storeAs($path, $fileName, 'r2');

            return $filePath;
        }

        throw new \RuntimeException('Invalid file upload.');
    } catch (\Exception $e) {
        throw new \RuntimeException('Image upload failed: '.$e->getMessage());
    }
}

function getCompany()
{
    return Company::first();
}
