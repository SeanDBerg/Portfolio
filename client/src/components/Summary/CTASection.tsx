import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useScrollResize } from '@/hooks/useScrollResize';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData } from '@/types/contact';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();
  const { toast } = useToast();

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
    // When form validation passes, allow the form to submit to the web app URL
    // The actual submission will be handled by the browser's form POST
    console.log('Form validated and ready to submit:', data);
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
          action="YOUR_WEB_APP_URL" 
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto mb-8 space-y-4"
          data-testid="contact-form"
        >
          {/* Hidden inputs for form submission to web app - these will be populated by React Hook Form */}
          <input type="hidden" name="name" value={form.watch('name')} />
          <input type="hidden" name="email" value={form.watch('email')} />
          <input type="hidden" name="phone" value={form.watch('phone')} />
          <input type="hidden" name="info" value={form.watch('info')} />
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
              className="px-6 py-3 bg-white hover:bg-gray-200 text-navy font-medium rounded-lg shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-white/30"
              data-testid="button-get-in-touch"
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Get In Touch'}
            </Button>
            <Link
              href="/resume"
              className="inline-block px-6 py-3 bg-transparent hover:bg-white/10 border border-white text-white font-medium rounded-lg transition-colors"
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