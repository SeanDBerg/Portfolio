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
  
  // Debug mode state
  const [debugMode, setDebugMode] = useState<boolean>(false);
  
  // Risk scoring state
  const [riskScore, setRiskScore] = useState<number>(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [showSoftWarning, setShowSoftWarning] = useState<boolean>(false);
  
  // Set form start time on mount
  useEffect(() => {
    setFormStartTime(Date.now());
    
    // Load failed attempts from localStorage
    const attempts = localStorage.getItem('formFailedAttempts');
    if (attempts) {
      setFailedAttempts(parseInt(attempts, 10));
    }
  }, []);
  
  // Load Cloudflare Turnstile script and set up callback
  useEffect(() => {
    // Define global callback for Turnstile
    (window as any).onTurnstileSuccess = (token: string) => {
      setCaptchaToken(token);
      console.log('✅ CAPTCHA completed');
    };
    
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
      delete (window as any).onTurnstileSuccess;
    };
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
  
  // Calculate risk score
  const calculateRiskScore = (data: ContactFormData, timeToComplete: number): number => {
    let score = 0;
    
    // Honeypot filled (+50 points)
    if (data.website) score += 50;
    
    // Decoy fields filled (+30 points each)
    if (data.subject) score += 30;
    if (data.url) score += 30;
    
    // Too fast (<2s) (+30 points)
    if (timeToComplete < 2000) score += 30;
    
    // Failed attempts (+20 points per attempt)
    score += failedAttempts * 20;
    
    return score;
  };
  
  // Debug function to fill honeypot
  const fillHoneypotForTesting = () => {
    form.setValue('website', 'bot-filled-this');
    form.setValue('subject', 'test-subject');
    form.setValue('url', 'http://bot-url.com');
    toast({
      title: "Debug: Honeypot Filled",
      description: "Now submit the form to test bot detection",
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Calculate time to complete
      const timeToComplete = Date.now() - formStartTime;
      const thirtyMinutes = 30 * 60 * 1000;
      
      // Check if form expired
      if (timeToComplete > thirtyMinutes) {
        toast({
          title: "Form expired",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Calculate risk score
      const currentRiskScore = calculateRiskScore(data, timeToComplete);
      setRiskScore(currentRiskScore);
      
      console.log('🎯 Risk Score:', currentRiskScore);
      
      // Risk threshold for CAPTCHA (50+ is risky)
      const RISK_THRESHOLD = 50;
      
      // Progressive disclosure logic
      if (currentRiskScore >= RISK_THRESHOLD) {
        // First risky attempt: Show soft warning
        if (!showSoftWarning && !showCaptcha) {
          setShowSoftWarning(true);
          const newAttempts = failedAttempts + 1;
          setFailedAttempts(newAttempts);
          localStorage.setItem('formFailedAttempts', newAttempts.toString());
          
          toast({
            title: "Please confirm you're human",
            description: "Your submission seems unusual. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        // Second risky attempt: Show CAPTCHA
        if (showSoftWarning && !showCaptcha) {
          setShowCaptcha(true);
          const newAttempts = failedAttempts + 1;
          setFailedAttempts(newAttempts);
          localStorage.setItem('formFailedAttempts', newAttempts.toString());
          
          toast({
            title: "Security check required",
            description: "Please complete the CAPTCHA below to continue.",
          });
          return;
        }
        
        // CAPTCHA required but not completed
        if (showCaptcha && !captchaToken) {
          toast({
            title: "CAPTCHA required",
            description: "Please complete the security check.",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Bot protection: Origin validation (strict equality)
      const allowedOrigins = [
        'https://seanberg.github.io',
        'http://localhost:5000',
        'http://127.0.0.1:5000'
      ];
      
      const currentOrigin = window.location.origin;
      const isAllowedOrigin = allowedOrigins.includes(currentOrigin);
      
      if (!isAllowedOrigin) {
        console.error('❌ Blocked - Invalid origin:', currentOrigin);
        console.error('❌ Allowed origins:', allowedOrigins);
        toast({
          title: "Error submitting form",
          description: "Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Prepare data for submission (include honeypot fields, origin, and CAPTCHA token)
      const dataToSend = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        info: data.info,
        website: data.website || '',  // Honeypot - should be empty for legitimate users
        subject: data.subject || '',  // Decoy - should be empty for legitimate users
        url: data.url || '',          // Decoy - should be empty for legitimate users
        requestOrigin: currentOrigin, // Send origin for server-side validation
        captchaToken: captchaToken || '', // CAPTCHA token if required
        riskScore: currentRiskScore   // Send risk score for logging
      };
      
      // Debug logging
      console.log('📧 Form data being sent:', dataToSend);
      console.log('📧 Origin:', currentOrigin);
      console.log('📧 JSON body:', JSON.stringify(dataToSend));
      
      // Submit data via Ajax to Google Apps Script (using JSON)
      const response = await fetch('https://script.google.com/macros/s/AKfycbyuTzlDq8m0Wi29ePQepdZA3Xb27AfXHGE5HifPj46kjTmgC_HkN73L4LncSQqmXYCDnQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
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
          
          {/* Soft Warning */}
          {showSoftWarning && !showCaptcha && (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-4">
              <p className="text-sm text-white">⚠️ Your submission seems unusual. Please review your information and try again.</p>
            </div>
          )}
          
          {/* Cloudflare Turnstile CAPTCHA */}
          {showCaptcha && (
            <div className="flex justify-center mb-4">
              <div
                className="cf-turnstile"
                data-sitekey="YOUR_TURNSTILE_SITE_KEY"
                data-callback="onTurnstileSuccess"
                data-theme="dark"
              ></div>
            </div>
          )}
          
          {/* Debug Controls */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => setDebugMode(!debugMode)}
              className="text-xs text-white/50 hover:text-white/80 underline"
            >
              {debugMode ? 'Hide Debug' : 'Show Debug'}
            </button>
          </div>
          
          {debugMode && (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-4">
              <p className="text-sm text-white mb-2">🐛 Debug Mode</p>
              <Button
                type="button"
                onClick={fillHoneypotForTesting}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                data-testid="button-debug-honeypot"
              >
                Fill Honeypot (Simulate Bot)
              </Button>
            </div>
          )}
          
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