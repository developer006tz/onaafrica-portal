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