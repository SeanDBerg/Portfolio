import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-white/90 mb-2"
          >
            {label}
            {required && <span className="text-red-300 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm',
            'text-gray-900 placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white',
            'transition-all duration-200 ease-in-out',
            error && 'border-red-300 focus:ring-red-300 focus:border-red-300',
            className
          )}
          data-testid={`input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-200" data-testid={`error-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';