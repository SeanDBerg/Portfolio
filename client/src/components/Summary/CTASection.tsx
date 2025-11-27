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
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [riskScore, setRiskScore] = useState<number>(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [showSoftWarning, setShowSoftWarning] = useState<boolean>(false);
  useEffect(() => {
    setFormStartTime(Date.now());
    const attempts = localStorage.getItem('formFailedAttempts');
    if (attempts) {
      setFailedAttempts(parseInt(attempts, 10));
    }
  }, []);
  useEffect(() => {
    if (!document.getElementById('turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);
  useEffect(() => {
    if (showCaptcha) {
      const renderWidget = () => {
        const container = document.getElementById('turnstile-container');
        if (!container) return;
        container.innerHTML = '';
        try {
          (window as any).turnstile.render('#turnstile-container', {
            sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
            callback: (token: string) => {
              setCaptchaToken(token);
              console.log('✅ CAPTCHA completed');
            },
            theme: 'dark'
          });
        } catch (err) {
          console.error('Failed to render Turnstile:', err);
        }
      };
      if ((window as any).turnstile) {
        renderWidget();
      } else {
        const maxAttempts = 50;
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if ((window as any).turnstile) {
            clearInterval(interval);
            renderWidget();
          } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            console.error('Turnstile failed to load');
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, [showCaptcha]);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      info: '',
      website: '',
      subject: '',
      url: ''
    }
  });
  const getSectionClass = () => {
    if (isShrunken) return 'section-shrunk';
    if (isEnlarged) return 'section-enlarged';
    return 'section-normal';
  };
  const calculateRiskScore = (data: ContactFormData, timeToComplete: number): number => {
    let score = 0;
    if (data.website) score += 50;
    if (data.subject) score += 30;
    if (data.url) score += 30;
    if (timeToComplete < 2000) score += 30;
    score += failedAttempts * 20;
    return score;
  };
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
      const timeToComplete = Date.now() - formStartTime;
      const thirtyMinutes = 30 * 60 * 1000;
      if (timeToComplete > thirtyMinutes) {
        toast({
          title: "Form expired",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
        return;
      }
      const currentRiskScore = calculateRiskScore(data, timeToComplete);
      setRiskScore(currentRiskScore);
      console.log('🎯 Risk Score:', currentRiskScore);
      const RISK_THRESHOLD = 50;
      if (currentRiskScore >= RISK_THRESHOLD) {
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
        if (showCaptcha && !captchaToken) {
          toast({
            title: "CAPTCHA required",
            description: "Please complete the security check.",
            variant: "destructive",
          });
          return;
        }
      }
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
      const dataToSend = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        info: data.info,
        website: data.website || '',
        subject: data.subject || '',
        url: data.url || '',
        requestOrigin: currentOrigin,
        captchaToken: captchaToken || '',
        riskScore: currentRiskScore
      };
      console.log('📧 Form data being sent:', dataToSend);
      console.log('📧 Origin:', currentOrigin);
      console.log('📧 JSON body:', JSON.stringify(dataToSend));
      const response = await fetch('https://script.google.com/macros/s/AKfycbyuTzlDq8m0Wi29ePQepdZA3Xb27AfXHGE5HifPj46kjTmgC_HkN73L4LncSQqmXYCDnQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      if (response.ok) {
        form.reset();
        setFormStartTime(Date.now());
        setShowSoftWarning(false);
        setShowCaptcha(false);
        setCaptchaToken('');
        setRiskScore(0);
        const newAttempts = Math.max(0, failedAttempts - 1);
        setFailedAttempts(newAttempts);
        localStorage.setItem('formFailedAttempts', newAttempts.toString());
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
    <>
      {/* Section separator: blue to purple transition */}
      <div className="section-separator section-separator-blue-to-purple mb-8"></div>
      
      <section
        ref={ref}
        id="contact"
        className={`relative overflow-hidden aurora-purple-flow rounded-xl shadow-2xl shadow-intel-purple/20 p-6 sm:p-8 lg:p-12 fade-transition fade-in border aurora-accent-purple ${getSectionClass()}`}
      >
        {/* Aurora wave overlay */}
        <div className="absolute inset-0 aurora-wave-overlay-purple pointer-events-none"></div>
        
      <div className="text-center relative z-10">
        <div className="relative z-10 inline-block">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
            Ready to transform your operations?
          </h2>
          <div className="absolute -inset-1 bg-intel-purple/20 blur-xl -z-10 rounded-full"></div>
        </div>
        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
          I embed with your existing team and tools, improving efficiency while your staff keep working as usual.
        </p>
        
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-intel-purple/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-berg-green/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-10 left-10 w-2 h-2 bg-intel-purple rounded-full blur-[1px] animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-berg-green rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-ops-blue rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto mb-8 space-y-4 relative z-10"
          data-testid="contact-form"
        >
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
          {showSoftWarning && !showCaptcha && (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-4">
              <p className="text-sm text-white">⚠️ Your submission seems unusual. Please review your information and try again.</p>
            </div>
          )}
          {showCaptcha && (
            <div className="flex justify-center mb-4">
              <div id="turnstile-container"></div>
            </div>
          )}
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
              className="inline-flex items-center justify-center px-8 py-4 bg-intel-purple hover:bg-intel-purple/90 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-intel-purple/50 transition-all focus:ring-4 focus:ring-intel-purple/30 min-w-[200px] neon-glow-purple transform hover:-translate-y-1"
              data-testid="button-submit"
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-white/20 text-white font-bold text-lg rounded-lg transition-colors min-w-[200px] hover:border-white/40"
              data-testid="link-view-resume"
            >
              View My Resume
            </Link>
          </div>
        </form>
      </div>
      </section>
    </>
  );
}