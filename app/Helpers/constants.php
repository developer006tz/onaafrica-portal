<?php

use App\Models\Role;
use Illuminate\Support\Facades\Storage;

function roles()
{
    return Role::get(['id', 'name'])->toArray();

}

function assetDomain()
{
    return 'https://assets.onaafricainvestment.com/onaafrica-portal/';
}

function uploadFile($file, $path = 'uploads')
{
    try {
        if ($file && $file->isValid()) {
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            
            $filePath = $file->storeAs($path, $fileName, 'r2');
            
            return $filePath;
        }

        throw new \RuntimeException('Invalid file upload.');
    } catch (\Exception $e) {
        throw new \RuntimeException('Image upload failed: ' . $e->getMessage());
    }
}
