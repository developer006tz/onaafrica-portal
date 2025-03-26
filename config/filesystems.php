<?php

return [

   
    'default' => env('FILESYSTEM_DISK', 'local'),

 

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
            'report' => false,
        ],

        'r2' => [
        'driver' => 's3',
        'key' => '411b3c7becafbf54bc59f4550f82e955',
        'secret' => '3f7b553dfdd0f67c63eedc2b993ff79997f5e6ba132dbf81921fe7f26c3a06ef',
        'region' => 'us-east-1',
        'bucket' => 'onaafrica-portal',
        'endpoint' => 'https://eb0253e51e133aa9e90121342279d1c9.r2.cloudflarestorage.com/onaafrica-portal',
        'alternative-endpoint'=> 'https://eb0253e51e133aa9e90121342279d1c9.eu.r2.cloudflarestorage.com'
    ],
    

    ],

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
