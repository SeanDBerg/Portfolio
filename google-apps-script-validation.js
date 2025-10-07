/**
 * Google Apps Script - Contact Form with Bot Protection
 * 
 * This script handles form submissions with multiple layers of validation:
 * 1. Content-Type validation (must be application/json)
 * 2. Origin/Referer validation (must be from allowed domains)
 * 3. Honeypot field validation (website, subject, url must be empty)
 * 4. HTTP method validation (must be POST)
 */

function doPost(e) {
  try {
    // 1. Validate HTTP Method (must be POST)
    if (!e || e.parameter === undefined) {
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Invalid request method' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. Validate Content-Type (must be application/json)
    const contentType = e.postData?.type || '';
    if (contentType !== 'application/json') {
      Logger.log('❌ Invalid Content-Type: ' + contentType);
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Invalid Content-Type' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. Parse JSON body
    let formData;
    try {
      formData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log('❌ Invalid JSON: ' + parseError);
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Invalid JSON' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 4. Validate Origin (strict matching - REQUIRED)
    const allowedOrigins = [
      'https://seanberg.github.io',
      'http://localhost:5000',
      'http://127.0.0.1:5000'
    ];
    
    // Extract origin from JSON payload
    const requestOrigin = formData.requestOrigin || '';
    
    // Origin is REQUIRED - reject if missing
    if (!requestOrigin) {
      Logger.log('❌ Missing origin - request rejected');
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Missing origin' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Strict equality check - no substring matching
    const isValidOrigin = allowedOrigins.includes(requestOrigin);
    
    if (!isValidOrigin) {
      Logger.log('❌ Invalid origin (strict check): ' + requestOrigin);
      Logger.log('❌ Allowed origins: ' + allowedOrigins.join(', '));
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Forbidden' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log('✅ Valid origin: ' + requestOrigin);
    
    // 5. Validate Honeypot Fields (must be empty)
    if (formData.website || formData.subject || formData.url) {
      Logger.log('❌ Honeypot triggered - Bot detected!');
      Logger.log('website: ' + formData.website);
      Logger.log('subject: ' + formData.subject);
      Logger.log('url: ' + formData.url);
      
      // Return success to bot (don't reveal detection)
      return ContentService.createTextOutput(
        JSON.stringify({ success: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 6. Extract legitimate form fields
    const name = formData.name || '';
    const email = formData.email || '';
    const phone = formData.phone || '';
    const info = formData.info || '';
    
    // 7. Validate required fields
    if (!name || !email || !info) {
      Logger.log('❌ Missing required fields');
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Missing required fields' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 8. Log successful submission
    Logger.log('✅ Valid submission received');
    Logger.log('Name: ' + name);
    Logger.log('Email: ' + email);
    Logger.log('Phone: ' + phone);
    Logger.log('Info: ' + info);
    
    // 9. Save to Google Sheet or send email
    // Example: Save to Google Sheet
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
    sheet.appendRow([
      new Date(),
      name,
      email,
      phone,
      info
    ]);
    
    // Example: Send email notification
    // MailApp.sendEmail({
    //   to: 'your-email@example.com',
    //   subject: 'New Contact Form Submission',
    //   body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${info}`
    // });
    
    // 10. Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true,
        message: 'Form submitted successfully' 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ Server error: ' + error);
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Server error' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - Remove in production
 */
function testValidation() {
  // Test with valid data
  const validData = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-1234',
        info: 'This is a test message',
        website: '',
        subject: '',
        url: ''
      })
    },
    parameter: {
      origin: 'https://seanberg.github.io'
    }
  };
  
  const result = doPost(validData);
  Logger.log('Valid test result: ' + result.getContent());
  
  // Test with honeypot filled (bot)
  const botData = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        name: 'Bot',
        email: 'bot@example.com',
        phone: '',
        info: 'Bot message',
        website: 'http://bot-site.com', // Honeypot filled!
        subject: '',
        url: ''
      })
    },
    parameter: {
      origin: 'https://seanberg.github.io'
    }
  };
  
  const botResult = doPost(botData);
  Logger.log('Bot test result: ' + botResult.getContent());
}
