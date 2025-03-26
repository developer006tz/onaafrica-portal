<?php

namespace Database\Seeders;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
   
    public function run(): void
    {
        $roles = [
            ['name' => 'manager'],
            ['name' => 'sales-manager'],
            ['name' => 'sales-officer'],
            ['name' => 'it'],
            ['name' => 'graphics-designer'],
        ];

        foreach($roles as $role)
        {
            Role::create($role);
        }
    }
}
