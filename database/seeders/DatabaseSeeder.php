<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Location;
use App\Models\Product;
use App\Models\Role;
use App\Models\Sales;
use App\Models\SalesProduct;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Using transactions to ensure data integrity
        DB::beginTransaction();

        try {
            $this->call(RolesSeeder::class);
            $users = $this->createUsers();
            // $locationIds = $this->createLocations();
            // $productIds = $this->createProducts();
            // $customers = $this->createCustomers($locationIds);
            // $this->createSales($customers, $productIds, $users);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->command->error("Seeding failed: {$e->getMessage()}");
        }
    }

    private function createUsers(): array
    {
        $users = [];

        $users['manager'] = User::create([
            'id' => Str::uuid(),
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'phone' => '255746828843',
            'role_id' => Role::where('name', 'manager')->first()->id,
            'staff_number' => 'ONA-0001',
            'password' => Hash::make('password'),
        ]);

        return $users;
    }

    private function createLocations(): array
    {
        $locations = [
            'Kariakoo', 'Masaki', 'Mwenge', 'Mbezi-Beach', 'Kisarawe',
        ];

        $locationIds = [];
        foreach ($locations as $locationName) {
            $location = Location::create([
                'id' => Str::uuid(),
                'name' => $locationName,
            ]);
            $locationIds[] = $location->id;
        }

        return $locationIds;
    }

    private function createProducts(): array
    {
        $products = [
            ['name' => 'Product A', 'description' => 'Description for Product A'],
            ['name' => 'Product B', 'description' => 'Description for Product B'],
            ['name' => 'Product C', 'description' => 'Description for Product C'],
            ['name' => 'Product D', 'description' => 'Description for Product D'],
            ['name' => 'Product E', 'description' => 'Description for Product E'],
        ];

        $productIds = [];
        foreach ($products as $productData) {
            $product = Product::create([
                'id' => Str::uuid(),
                'name' => $productData['name'],
                'description' => $productData['description'],
            ]);
            $productIds[] = $product->id;
        }

        return $productIds;
    }

    private function createCustomers(array $locationIds): array
    {
        $customers = [];
        for ($i = 1; $i <= 10; $i++) {
            $customer = Customer::create([
                'id' => Str::uuid(),
                'name' => "Customer $i",
                'contact_person' => "Contact Person $i", // Adding the contact person
                'email' => "customer$i@example.com",
                'phone' => '9876543'.str_pad($i, 3, '0', STR_PAD_LEFT),
                'location_id' => $locationIds[array_rand($locationIds)],
            ]);
            $customers[] = $customer;
        }

        return $customers;
    }

    private function createSales(array $customers, array $productIds, array $users): void
    {
        for ($i = 0; $i < 20; $i++) {
            $isNewCustomer = rand(0, 1) === 1 ? 'YES' : 'NO'; // Using 'YES'/'NO' instead of boolean
            $customer = $customers[array_rand($customers)];

            $sale = Sales::create([
                'id' => Str::uuid(),
                'customer_id' => $customer->id,
                'sales_date' => now()->subDays(rand(1, 30)),
                'is_new_customer' => $isNewCustomer,
                'created_by' => $i % 2 === 0 ? $users['salesManager']->id : $users['salesOfficer']->id,
            ]);

            $this->createSalesProducts($sale->id, $productIds);
        }
    }

    private function createSalesProducts(string $salesId, array $productIds): void
    {
        // Add products to the sale
        $numProducts = rand(1, 3);
        $usedProducts = [];

        for ($j = 0; $j < $numProducts; $j++) {
            // Ensure we don't add the same product twice to a sale
            do {
                $productIndex = array_rand($productIds);
            } while (in_array($productIndex, $usedProducts));

            $usedProducts[] = $productIndex;

            SalesProduct::create([
                'id' => Str::uuid(),
                'sales_id' => $salesId,
                'product_id' => $productIds[$productIndex],
                'quantity' => rand(1, 5),
            ]);
        }
    }
}
