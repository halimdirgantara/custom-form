<?php
namespace App\Enums;

enum UserRoleEnum:string {
    case SuperAdmin = 'superadmin';
    case Admin = 'admin';
    case User = 'user';
}
