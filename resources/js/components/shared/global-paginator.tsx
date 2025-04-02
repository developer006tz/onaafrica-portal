import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';

interface PaginationData {
    current_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface GlobalPaginatorProps {
    data: PaginationData;
    className?: string;
}

export default function GlobalPaginator({ data, className = '' }: GlobalPaginatorProps) {
    return (
        <div className={`border-border flex flex-col items-center justify-between gap-4 border-t px-2 py-3 sm:flex-row sm:px-4 sm:py-4 ${className}`}>
            <div className="text-muted-foreground text-xs whitespace-nowrap sm:text-sm">
                Showing <span className="font-medium">{(data.current_page - 1) * data.per_page + 1}</span> to{' '}
                <span className="font-medium">{Math.min(data.current_page * data.per_page, data.total)}</span> of{' '}
                <span className="font-medium">{data.total}</span> results
            </div>
            <Pagination className="flex flex-wrap justify-center gap-1 sm:justify-end">
                {data.links.map((link, i) =>
                    link.url ? (
                        <Link
                            key={i}
                            href={link.url}
                            className={`${link.active ? 'bg-primary text-primary-foreground' : 'bg-background'} border-input ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-7 min-w-7 items-center justify-center rounded-md border px-2 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:h-8 sm:min-w-8 sm:px-3 sm:text-sm`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    ) : (
                        <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            disabled
                            className="h-7 min-w-7 cursor-not-allowed px-2 py-1 text-xs opacity-50 sm:h-8 sm:min-w-8 sm:px-3 sm:text-sm"
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                    ),
                )}
            </Pagination>
        </div>
    );
}
