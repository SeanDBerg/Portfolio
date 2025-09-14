import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useScrollResize } from '@/hooks/useScrollResize';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData } from '@/types/contact';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      info: ''
    }
  });

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  const onSubmit = (data: ContactFormData) => {
    // Validation passed, now submit the form to the web app URL
    console.log('Form validated and ready to submit:', data);
    
    // Use the form ref to submit the form after validation
    if (formRef.current) {
      setTimeout(() => {
        formRef.current?.submit();
      }, 0);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`bg-gradient-to-br from-blue-950 via-sky-800 to-blue-950 dark:from-primary/80 dark:to-blue-900 text-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 fade-transition fade-in ${getSectionClass()}`}
    >
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to transform your operations?
        </h2>
        <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Let's collaborate on optimizing your business processes and building high-performing teams.
        </p>

        {/* Contact Form */}
        <form 
          ref={formRef}
          action="https://script.google.com/macros/s/AKfycbxtYmpf_k7uCNfrDCqtO4bOtH_K-Qvb3MBuUXoFptC2r2tpdLDLjPwgFxGZ1KQOsGy4kg/exec" 
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto mb-8 space-y-4"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              label="Name"
              placeholder="Your full name"
              required
              {...form.register('name')}
              error={form.formState.errors.name?.message}
            />
            
            <FormInput
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              required
              {...form.register('email')}
              error={form.formState.errors.email?.message}
            />
            
            <FormInput
              label="Phone"
              type="tel"
              placeholder="(555) 123-4567"
              {...form.register('phone')}
              error={form.formState.errors.phone?.message}
            />
            
            <FormTextarea
              label="Info"
              placeholder="Tell me about your project, goals, or how I can help you..."
              required
              {...form.register('info')}
              error={form.formState.errors.info?.message}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-200 text-navy font-medium rounded-lg shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-white/30 w-[160px]"
              data-testid="button-submit"
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-white/10 border border-white text-white font-medium rounded-lg transition-colors w-[160px]"
              data-testid="link-view-resume"
            >
              View My Resume
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}