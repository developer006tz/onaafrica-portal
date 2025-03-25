export const FormLabel = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
  
  export const FormDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  );
  
  export const FormMessage = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm font-medium text-destructive">
      {children}
    </p>
  );