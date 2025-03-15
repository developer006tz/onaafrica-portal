import React, { ReactNode, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

// Types
export type DataTableColumn<T> = {
  key: string;
  label: string;
  render?: (row: T, index: number) => ReactNode;
  responsive?: 'always' | 'md' | 'lg' | 'xl'; // When to show the column based on screen size
};

export type DataTableAction<T> = {
  icon: ReactNode;
  label: string;
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive';
  className?: string;
  condition?: (row: T) => boolean; // Optional condition to determine if action should be shown
};

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  keyField: keyof T;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filterable?: boolean;
  onFilter?: () => void;
  emptyState?: {
    title: string;
    description?: string;
    action?: {
      label: string;
      icon?: ReactNode;
      onClick: () => void;
    };
  };
  className?: string;
  mobileCardRender?: (row: T, index: number) => ReactNode;
};

export function DataTable<T>({
  data,
  columns,
  actions = [],
  keyField,
  pagination,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  filterable = false,
  onFilter,
  emptyState = {
    title: "No data found",
  },
  className = "",
  mobileCardRender
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  // Helper function to get responsive class
  const getResponsiveClass = (responsive?: 'always' | 'md' | 'lg' | 'xl') => {
    if (!responsive || responsive === 'always') return '';
    const classes: Record<string, string> = {
      md: 'hidden md:table-cell',
      lg: 'hidden lg:table-cell',
      xl: 'hidden xl:table-cell'
    };
    return classes[responsive] || '';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and filter section */}
      {(searchable || filterable) && (
        <div className="flex flex-col gap-4 sm:flex-row">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          )}
          {filterable && (
            <Button variant="outline" className="flex items-center gap-2" onClick={onFilter}>
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          )}
        </div>
      )}

      {/* Table for desktop and tablet */}
      <div className="hidden rounded-lg border border-border md:block">
        {data.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead 
                        key={column.key.toString()} 
                        className={`${getResponsiveClass(column.responsive)}`}
                      >
                        {column.label}
                      </TableHead>
                    ))}
                    {actions.length > 0 && (
                      <TableHead className="text-right">Actions</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, rowIndex) => (
                    <TableRow key={String(row[keyField])} className="hover:bg-muted/50">
                      {columns.map((column) => (
                        <TableCell 
                          key={`${String(row[keyField])}-${column.key}`}
                          className={`${getResponsiveClass(column.responsive)}`}
                        >
                          {column.render 
                            ? column.render(row, rowIndex)
                            : (row[column.key as keyof T] as ReactNode) || '-'}
                        </TableCell>
                      ))}
                      {actions.length > 0 && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {actions.map((action, i) => (
                              (!action.condition || action.condition(row)) && (
                                <Button 
                                  key={i} 
                                  variant="ghost" 
                                  size="icon" 
                                  className={`hidden md:inline-flex ${action.className || ''}`}
                                  onClick={() => action.onClick(row)}
                                >
                                  {action.icon}
                                </Button>
                              )
                            ))}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {actions.map((action, i) => (
                                  (!action.condition || action.condition(row)) && (
                                    <DropdownMenuItem 
                                      key={i} 
                                      className={action.variant === 'destructive' ? 'text-destructive' : ''}
                                      onClick={() => action.onClick(row)}
                                    >
                                      {action.icon && <span className="mr-2">{action.icon}</span>}
                                      {action.label}
                                    </DropdownMenuItem>
                                  )
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {pagination && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-4 py-4 sm:flex-row">
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing <span className="font-medium">{(pagination.current_page - 1) * pagination.per_page + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(pagination.current_page * pagination.per_page, pagination.total)}</span>{' '}
                  of <span className="font-medium">{pagination.total}</span> results
                </div>
                <Pagination className="flex flex-wrap justify-center gap-1">
                  {pagination.links.map((link, i) => (
                    link.url ? (
                      <Link
                        key={i}
                        href={link.url}
                        className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-input px-3 py-1 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                      >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                      </Link>
                    ) : (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        disabled
                        className="h-8 min-w-8 px-3 py-1 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm opacity-50 cursor-not-allowed"
                      >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                      </Button>
                    )
                  ))}
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">{emptyState.title}</p>
              {emptyState.description && <p className="text-muted-foreground text-sm mb-4">{emptyState.description}</p>}
              {emptyState.action && (
                <Button variant="outline" className="flex items-center gap-2" onClick={emptyState.action.onClick}>
                  {emptyState.action.icon}
                  <span>{emptyState.action.label}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {data.length > 0 ? (
          <>
            {data.map((row, index) => (
              mobileCardRender ? (
                <React.Fragment key={String(row[keyField])}>
                  {mobileCardRender(row, index)}
                </React.Fragment>
              ) : (
                <Card key={String(row[keyField])} className="overflow-hidden">
                  <div className="flex items-start justify-between p-4">
                    <div className="flex-1">
                      {/* Display first column as heading, assuming it's the name/title */}
                      {columns[0]?.render ? columns[0].render(row, index) : String(row[columns[0]?.key as keyof T] || '')}
                    </div>
                    {actions.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions.map((action, i) => (
                            (!action.condition || action.condition(row)) && (
                              <DropdownMenuItem 
                                key={i} 
                                className={action.variant === 'destructive' ? 'text-destructive' : ''}
                                onClick={() => action.onClick(row)}
                              >
                                {action.icon && <span className="mr-2">{action.icon}</span>}
                                {action.label}
                              </DropdownMenuItem>
                            )
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <div className="border-t border-border px-4 py-3 space-y-1 text-sm">
                    {/* Skip the first column as it's already shown in the header */}
                    {columns.slice(1).map((column) => (
                      <div key={column.key.toString()} className="flex justify-between">
                        <span className="text-muted-foreground">{column.label}:</span>
                        <span className="truncate max-w-[180px]">
                          {column.render 
                            ? column.render(row, index)
                            : (row[column.key as keyof T] as ReactNode) || '-'}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            ))}

            {pagination && (
              <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 sm:flex-row">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{pagination.total}</span> total results
                </div>
                <Pagination className="flex flex-wrap justify-center gap-1">
                  {pagination.links.map((link, i) => (
                    link.url ? (
                      <Link
                        key={i}
                        href={link.url}
                        className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-input px-3 py-1 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                      >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                      </Link>
                    ) : (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        disabled
                        className="h-8 min-w-8 px-3 py-1 text-xs opacity-50 cursor-not-allowed"
                      >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                      </Button>
                    )
                  ))}
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">{emptyState.title}</p>
              {emptyState.description && <p className="text-muted-foreground text-sm mb-4">{emptyState.description}</p>}
              {emptyState.action && (
                <Button variant="outline" className="flex items-center gap-2" onClick={emptyState.action.onClick}>
                  {emptyState.action.icon}
                  <span>{emptyState.action.label}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}