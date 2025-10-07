import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().optional(),
  info: z.string().min(15, 'Please provide at least 15 characters in your message'),
  // Bot protection fields (honeypot and decoys)
  website: z.string().optional(),
  subject: z.string().optional(),
  url: z.string().optional(),
});

// Type inference from schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Props for contact form components
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting?: boolean;
}