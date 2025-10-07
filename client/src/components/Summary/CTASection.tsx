import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useScrollResize } from '@/hooks/useScrollResize';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData } from '@/types/contact';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function CTASection() {
  const { ref, isShrunken, isEnlarged } = useScrollResize();
  const { toast } = useToast();
  
  // Bot protection: Track form render timestamp
  const [formStartTime, setFormStartTime] = useState<number>(0);
  
  // Set form start time on mount
  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      info: '',
      website: '', // Honeypot
      subject: '', // Decoy
      url: '' // Decoy
    }
  });

  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Bot protection: Check honeypot field
      if (data.website) {
        toast({
          title: "Error submitting form",
          description: "Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Bot protection: Check decoy fields
      if (data.subject || data.url) {
        toast({
          title: "Error submitting form",
          description: "Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Bot protection: Check time-to-complete
      const timeToComplete = Date.now() - formStartTime;
      const twoSeconds = 2000;
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (timeToComplete < twoSeconds) {
        toast({
          title: "Please slow down",
          description: "Please take your time filling out the form.",
          variant: "destructive",
        });
        return;
      }
      
      if (timeToComplete > thirtyMinutes) {
        toast({
          title: "Form expired",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Prepare clean data for submission (remove bot protection fields)
      const cleanData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        info: data.info
      };
      
      // Submit data via Ajax to Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbyuTzlDq8m0Wi29ePQepdZA3Xb27AfXHGE5HifPj46kjTmgC_HkN73L4LncSQqmXYCDnQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(cleanData).toString()
      });

      if (response.ok) {
        // Clear the form
        form.reset();
        
        // Reset form start time for next submission
        setFormStartTime(Date.now());
        
        // Show success toast
        toast({
          title: "Thank you for your message!",
          description: "I'll get back to you soon.",
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto mb-8 space-y-4"
          data-testid="contact-form"
        >
          {/* Honeypot field - hidden from users but visible to bots */}
          <input
            type="text"
            {...form.register('website')}
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
            aria-hidden="true"
          />
          
          {/* Decoy fields - hidden from users but attractive to bots */}
          <input
            type="text"
            {...form.register('subject')}
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
            aria-hidden="true"
          />
          
          <input
            type="text"
            {...form.register('url')}
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
            aria-hidden="true"
          />
          
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
              className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-200 text-navy font-medium rounded-lg shadow-lg hover:shadow-xl transition-all focus:ring-4 focus:ring-white/30 min-w-[180px]"
              data-testid="button-submit"
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent hover:bg-white/10 border border-white text-white font-medium rounded-lg transition-colors min-w-[180px]"
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