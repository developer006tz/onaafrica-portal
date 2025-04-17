export const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      'manager': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      'sales-manager': 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
      'sales-officer': 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
      'it': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
      'graphics-designer': 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

export const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'COMPLETE':
            return 'bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset';
        case 'PENDING':
            return 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 ring-inset';
        case 'CANCELLED':
            return 'bg-red-50 text-red-700 ring-1 ring-red-600/20 ring-inset';
        default:
            return 'bg-muted text-muted-foreground ring-border/20 ring-1 ring-inset';
    }
};

export const getInvoiceStatusBadgeClass = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
        case 'complete':
        case 'paid':
            return 'bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset';
        case 'pending':
        case 'draft':
            return 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 ring-inset';
        case 'cancelled':
        case 'rejected':
            return 'bg-red-50 text-red-700 ring-1 ring-red-600/20 ring-inset';
        default:
            return 'bg-muted text-muted-foreground ring-border/20 ring-1 ring-inset';
    }
};

export const getInvoiceTypeClass = (type: string) => {
    const statusLower = type.toLowerCase();
    switch (statusLower) {
        case 'invoice':
            return 'bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset';
        case 'performa':
            return 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 ring-inset';
        default:
            return 'bg-muted text-muted-foreground ring-border/20 ring-1 ring-inset';
    }
};
