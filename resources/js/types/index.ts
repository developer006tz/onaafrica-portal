import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    photo?: string;
    role: 'manager' | 'sales-manager' | 'sales-officer' | 'it' | 'graphics-designer';
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; 
}
