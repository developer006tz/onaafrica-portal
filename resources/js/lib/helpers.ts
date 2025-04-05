export const getInitials = (name: string) => {
    if (!name) return ''
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
  }
  
  export const calculateAge = (dob: string | Date) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  export const formatDate = (dateString: string | Date) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

export const getTimeSpent = (timeFrom: string | Date | undefined, timeTo: string | Date | undefined) => {
    if (!timeFrom || !timeTo) return 'N/A';

    try {
        const startTime = new Date(timeFrom);
        const endTime = new Date(timeTo);

        // Calculate difference in milliseconds
        const diffMs = endTime.getTime() - startTime.getTime();

        // Convert to hours and minutes
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    } catch (e) {
        console.error('Error calculating time spent:', e);
        return 'Invalid time';
    }
};

   export  const formatPhones = (customer_phones: any) => {
        if (!customer_phones || customer_phones.length === 0) return 'N/A';
        return customer_phones.join(', ');
    };

    export const formartCurrency = (amount: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'TZS',
            minimumFractionDigits: 2,
            currencyDisplay: 'symbol',
            currencySign: 'accounting'
        }).format(amount as any).replace('TZS', '') + ' TZS';
    }