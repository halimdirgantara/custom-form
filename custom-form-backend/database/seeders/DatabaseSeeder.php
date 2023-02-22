<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Enums\UserRoleEnum;
use App\Enums\UserStatusEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Add user
        User::Create([
            'name' => 'super admin',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'role' => UserRoleEnum::SuperAdmin,
            'status' => UserStatusEnum::Active,
        ]);
    }
}
