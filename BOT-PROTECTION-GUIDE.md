# Bot Protection Implementation Guide

## Overview

This portfolio website implements comprehensive bot protection for the contact form using a multi-layered, adaptive approach. The protection works entirely client-side with Google Apps Script validation - no backend server required.

## Protection Layers

### 1. Invisible Tripwires (Silent Detection)

#### Honeypot Fields
- **Primary honeypot**: `website` field (off-screen, hidden from users)
- **Decoy fields**: `subject` and `url` (appear legitimate to bots)
- **Risk Score**: +50 points if honeypot filled, +30 per decoy field
- All fields positioned absolutely off-screen with `left: -9999px`

#### Time-to-Complete Validation
- **Minimum time**: 2 seconds (detects speed bots)
- **Maximum time**: 30 minutes (form expiration)
- **Risk Score**: +30 points if submitted too quickly (<2s)

### 2. Origin Validation

#### Client-Side Check
```javascript
const allowedOrigins = [
  'https://seanberg.github.io',
  'http://localhost:5000'
];
```
- Strict equality matching against `window.location.origin`
- Blocks submissions from unauthorized domains

#### Server-Side Check (Google Apps Script)
```javascript
const allowedOrigins = [
  'https://seanberg.github.io'
];
```
- Validates `requestOrigin` field sent in JSON payload
- **Note**: This can be spoofed since Google Apps Script cannot access real HTTP headers

### 3. Adaptive CAPTCHA Challenge (Progressive Disclosure)

#### Risk Scoring System
The system calculates a risk score based on multiple factors:

```javascript
let score = 0;

// Honeypot filled
if (data.website) score += 50;

// Decoy fields filled
if (data.subject) score += 30;
if (data.url) score += 30;

// Too fast (<2s)
if (timeToComplete < 2000) score += 30;

// Failed attempts (persistent)
score += failedAttempts * 20;
```

#### Progressive Response
- **Risk Score < 50**: Form submits normally ✅
- **Risk Score ≥ 50 (First attempt)**: Soft warning, +1 failed attempt ⚠️
- **Risk Score ≥ 50 (Second attempt)**: CAPTCHA challenge required 🔒
- **CAPTCHA not completed**: Submission blocked ❌

#### Cloudflare Turnstile Integration
```javascript
// Load Turnstile script
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

// Widget
<div 
  className="cf-turnstile"
  data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  data-callback="onTurnstileSuccess"
  data-theme="dark"
></div>
```

## Data Flow

### Client to Server
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "info": "Project inquiry...",
  "website": "",           // Honeypot - should be empty
  "subject": "",           // Decoy - should be empty
  "url": "",              // Decoy - should be empty
  "requestOrigin": "https://seanberg.github.io",
  "captchaToken": "0x4AAA...",  // If CAPTCHA required
  "riskScore": 75         // For logging
}
```

### Server Validation Sequence (Google Apps Script)

1. **Content-Type Check**: Must be `application/json`
2. **Parse JSON**: Extract form data
3. **Origin Validation**: Check `requestOrigin` against whitelist
4. **Server-Side Risk Calculation**: 
   - **NEVER trust client's riskScore** - calculate independently
   - Check honeypot field (+50 points)
   - Check decoy fields (+30 points each)
   - Note: Time-to-complete cannot be validated server-side (limitation of static architecture)
5. **CAPTCHA Verification**: If server risk score > 0, CAPTCHA token is REQUIRED
6. **Honeypot Validation**: Final redundant check (defense in depth)
7. **Success**: Process legitimate submission

## Google Apps Script Setup

### Environment Variables
You need to set up the Turnstile secret key in your Apps Script:

```javascript
const turnstileSecret = 'YOUR_TURNSTILE_SECRET_KEY';
```

### CAPTCHA Verification Flow
```javascript
// CRITICAL: Calculate risk score SERVER-SIDE (never trust client)
let serverRiskScore = 0;

if (formData.website && formData.website.trim() !== '') {
  serverRiskScore += 50;
}
if (formData.subject && formData.subject.trim() !== '') {
  serverRiskScore += 30;
}
if (formData.url && formData.url.trim() !== '') {
  serverRiskScore += 30;
}

// If ANY risk detected, CAPTCHA is required
if (serverRiskScore > 0) {
  if (!captchaToken) {
    return error('CAPTCHA required');
  }
  
  // Verify CAPTCHA with Cloudflare
  const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  
  const verifyPayload = {
    secret: turnstileSecret,
    response: captchaToken
  };
  
  const verifyResponse = UrlFetchApp.fetch(verifyUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(verifyPayload)
  });
  
  const verifyResult = JSON.parse(verifyResponse.getContentText());
  
  if (!verifyResult.success) {
    return error('CAPTCHA verification failed');
  }
}
```

## Replit Secrets Configuration

Two secrets are required:

1. **VITE_TURNSTILE_SITE_KEY** (Public - shown on website)
   - Used in the Turnstile widget `data-sitekey` attribute
   - Visible in frontend code

2. **TURNSTILE_SECRET_KEY** (Private - for verification)
   - Used by Google Apps Script to verify CAPTCHA tokens
   - Never exposed to frontend

### How to Get Turnstile Keys

1. Go to https://dash.cloudflare.com/
2. Sign in (or create free account)
3. Navigate to "Turnstile" in sidebar
4. Click "Add Site"
5. Enter your domain (e.g., `seanberg.github.io`)
6. Copy both Site Key and Secret Key
7. Add them to Replit Secrets

## Security Features

### ✅ What This Protects Against
- Simple bots that fill all form fields
- Speed bots that submit forms instantly (client-side only)
- Automated scripts from unauthorized domains (limited protection)
- Repeated spam attempts (progressive difficulty)
- **Direct API attacks**: Server calculates risk independently, cannot be bypassed by spoofing client risk score

### ✅ Security Improvements (Post-Architect Review)
1. **Server-side risk calculation**: Server never trusts client's riskScore - calculates independently
2. **CAPTCHA enforcement**: ANY honeypot/decoy field trigger requires CAPTCHA verification
3. **State reset after success**: UI properly resets warning/CAPTCHA states for next submission
4. **Failed attempt decay**: Successful submissions reduce failed attempt count to prevent permanent lockout

### ❌ Limitations
- **CSRF Protection**: Google Apps Script cannot access real HTTP Origin/Referer headers, so origin validation can be spoofed
- **Time-to-complete validation**: Cannot be enforced server-side without storing form load timestamps
- **Sophisticated Bots**: Advanced bots that mimic human behavior may bypass initial checks
- **No Rate Limiting**: Google Apps Script has limited rate limiting capabilities

### 🔒 Future Improvements (with Backend Server)
- True CSRF protection with real HTTP header validation
- Server-side time-to-complete validation with session tokens
- Rate limiting by IP address
- User session tracking
- Advanced fingerprinting
- Machine learning-based bot detection

## Debug Mode

The form includes a debug mode for testing:

1. Click "Show Debug" link
2. Click "Fill Honeypot" to simulate bot behavior
3. Submit form to test detection
4. Check console for risk scores and detection logs

### Debug Console Output
```javascript
console.log('🎯 Risk Score:', currentRiskScore);
console.log('📧 Form data being sent:', dataToSend);
console.log('✅ CAPTCHA completed');
```

## Testing Scenarios

### Legitimate User (Risk Score: 0)
- Fill form normally
- Wait >2 seconds before submit
- Don't touch honeypot fields
- ✅ Submits immediately

### Suspicious User (Risk Score: 50-69)
- Trigger one protection (e.g., submit too fast)
- ⚠️ Receives soft warning
- Can retry submission

### High Risk User (Risk Score: 70+)
- Trigger multiple protections
- Multiple failed attempts
- 🔒 CAPTCHA challenge appears
- Must complete CAPTCHA to submit

### Bot Behavior (Risk Score: 50+)
- Fills honeypot field
- Fills decoy fields
- Submits instantly (<2s)
- ❌ Blocked or challenged

## File Structure

```
client/src/components/Summary/CTASection.tsx  # Main form with protection logic
client/src/types/contact.ts                    # Form data types
google-apps-script-validation.js               # Server-side validation
```

## Deployment Checklist

- [ ] Set up Cloudflare Turnstile account
- [ ] Get Site Key and Secret Key
- [ ] Add Site Key to Replit Secrets as `VITE_TURNSTILE_SITE_KEY`
- [ ] Add Secret Key to Google Apps Script (replace `YOUR_TURNSTILE_SECRET_KEY`)
- [ ] Update allowed origins in both client and server code
- [ ] Deploy Google Apps Script as web app
- [ ] Update form submission URL in CTASection.tsx
- [ ] Test all protection layers
- [ ] Remove/disable debug mode in production

## Maintenance

### Monitoring
- Check Google Apps Script execution logs for blocked attempts
- Monitor CAPTCHA verification success rate
- Track failed attempt patterns

### Adjusting Risk Thresholds
```javascript
// In CTASection.tsx
const RISK_THRESHOLD = 50;  // Adjust this value

// Risk score weights
honeypot: +50
decoy fields: +30 each
too fast: +30
failed attempts: +20 each
```

### Updating Allowed Origins
```javascript
// Client-side (CTASection.tsx)
const allowedOrigins = [
  'https://seanberg.github.io',
  'http://localhost:5000'  // Remove in production
];

// Server-side (Google Apps Script)
const allowedOrigins = [
  'https://seanberg.github.io'
];
```

## License & Credits

- **Cloudflare Turnstile**: Free CAPTCHA alternative to reCAPTCHA
- **Google Apps Script**: Free serverless backend for form submissions
- Implementation follows OWASP guidelines for form security
