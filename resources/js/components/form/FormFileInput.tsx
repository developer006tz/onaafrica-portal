import { FormDescription, FormLabel, FormMessage } from '@/lib/form-helper';
import { CloudUpload, Paperclip, X } from "lucide-react";
import { useState } from "react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/ui/file-upload";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormFileInputProps {
  label: string;
  error?: string;
  description?: string;
  value?: File[] | null;
  onChange?: (files: File[] | null) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  acceptedTypes?: string;
  helperText?: string;
  
}

export function FormFileInput({
  label,
  id,
  error,
  description,
  className,
  value,
  onChange,
  disabled,
  maxFiles = 1,
  maxSize = 1024 * 1024 * 4,
  multiple = false,
  acceptedTypes = "image/*",
  helperText = "SVG, PNG, JPG or GIF",
}: FormFileInputProps) {
  /**
   * Maintain internal state for files while also supporting controlled usage
   * through the value and onChange props
   */
  const [files, setFiles] = useState<File[] | null>(value || null);

  const acceptTypes = acceptedTypes.split(',').reduce((acc, type) => {
    const trimmed = type.trim();
    if (trimmed) acc[trimmed] = [];
    return acc;
  }, {} as Record<string, string[]>);

  const dropZoneConfig = {
    maxFiles,
    maxSize,
    multiple,
    accept: acceptTypes,
    disabled,
  };

  function handleFileChange(newFiles: File[] | null) {
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
    }
  }

  /**
   * Remove a specific file from the selection
   */
  function handleRemoveFile(index: number) {
    if (!files) return;
    
    const newFiles = [...files];
    newFiles.splice(index, 1);
    
    const updatedFiles = newFiles.length > 0 ? newFiles : null;
    setFiles(updatedFiles);
    
    if (onChange) {
      onChange(updatedFiles);
    }
  }

  return (
    <>
      <FormLabel htmlFor={id || ''}>{label}</FormLabel>
      <FileUploader
        value={files}
        onValueChange={handleFileChange}
        dropzoneOptions={dropZoneConfig}
        className={cn("relative bg-background rounded-lg p-2", className)}
      >
        <FileInput
          id={id || "fileInput"}
          className="outline-dashed outline-1 outline-slate-500"
        >
          <div className="flex items-center justify-center flex-col p-8 w-full">
            <CloudUpload className='text-gray-500 w-10 h-10' />
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
              &nbsp; or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
            {maxSize && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Max size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
              </p>
            )}
          </div>
        </FileInput>
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i} className="group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Paperclip className="h-4 w-4 stroke-current mr-2" />
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(i);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>
      {description && <FormDescription>{description}</FormDescription>}
      {error && <FormMessage>{error}</FormMessage>}
    </>
  );
}