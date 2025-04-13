import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    [key: string]: unknown;
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

export interface PageProps {
    auth: Auth;
    errors: Record<string, string>;
    flash?: {
        success: string | null;
        error: string | null;
        warning: string | null;
    };
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    photo?: string | null;
    role: 'manager' | 'sales-manager' | 'sales-officer' | 'it' | 'graphics-designer';
    email_verified_at?: string | null;
    created_at: string;
    updated_at?: string;
    [key: string]: unknown;
}

export interface Role {
    id: string;
    name: string;
}

export type Roles = Role[];

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    created_by?: string;
    created_at: string;
}

export interface CompanyBranch {
    id: string;
    name: string;
}

export interface ButonVariant {
    buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export interface Report {
    id: string;
    reference_number: string;
    staff_id: string;
    customer_id: string;
    property_type: string;
    address: string;
    customer_phones?: string[];
    time_from?: string;
    time_to?: string;
    description?: string;
    status: 'COMPLETE' | 'PENDING' | 'CANCELLED';
    date: string;
    customer: string;
    created_at?: string;
    updated_at?: string;
}

export interface ReportsData {
    data: Report[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface PreviousReportData {
    reports: Report[];
}

export interface Invoice {
    id: string;
    invoice_number: string;
    invoice_type: string;
    issue_date: string;
    sub_total: string;
    vat_rate: string;
    vat_type: string;
    vat_amount: string;
    total_amount: string;
    delivery_timeline: string;
    payment_terms: string;
    delivery_location: string;
    company_branch: string;
    status: string;
    achieved: string;
    created_at: string;
    customer: {
        id: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    };
    created_by: {
        id: string;
        name: string;
        email: string;
    };
    invoice_items: Array<{
        item_description: string;
        unit_price: number;
        quantity: number;
        amount: number;
    }>;
    items_count: number;
}

export interface InvoicesData {
    data: Invoice[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}
