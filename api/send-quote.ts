import { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiter with periodic cleanup
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = 5;
  const windowMs = 60 * 60 * 1000; // 1 hour

  // Clean expired keys from cache (10% chance per call to avoid unbounded growth)
  if (Math.random() < 0.1) {
    for (const [key, value] of rateLimitCache.entries()) {
      if (now > value.resetTime) {
        rateLimitCache.delete(key);
      }
    }
  }

  const cached = rateLimitCache.get(ip);
  if (!cached || now > cached.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (cached.count >= limit) {
    return true;
  }

  cached.count += 1;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers restricted to qasim.live domains
  const origin = req.headers['origin'] as string;
  const allowedOrigins = ['https://qasim.live', 'https://www.qasim.live'];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic rate limiting by client IP
  const ip = (req.headers['cf-connecting-ip'] as string) || 
             (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || 
             'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    // req.body is untyped in @vercel/node; cast to typed record to prevent unsafe-any warnings
    const { name, email, phone, projectType, preferredDate, message, company_website } = req.body as Record<string, string | undefined>;

    // 1. Honeypot check: silently ignore submission if filled by bots
    if (company_website) {
      console.warn('Honeypot field filled. Silently ignoring bot submission.');
      return res.status(200).json({ success: true });
    }

    // Validate required fields presence
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Server-side length caps
    if (name.length > 200 || email.length > 200) {
      return res.status(400).json({ error: 'Name and email must be 200 characters or less' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message must be 5000 characters or less' });
    }

    // 4. Tighten email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address format' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const quoteNotificationTemplateId = process.env.BREVO_QUOTE_NOTIFICATION_TEMPLATE_ID;
    const clientReplyTemplateId = process.env.BREVO_CLIENT_REPLY_TEMPLATE_ID;

    if (!apiKey || !quoteNotificationTemplateId) {
      console.error('Missing Brevo configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Send quote notification to you (internal)
    const notificationResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: 'contact@qasim.live', name: 'Qasim Bokhari' },
        templateId: parseInt(quoteNotificationTemplateId),
        to: [{ email: 'contact@qasim.live', name: 'Qasim Bokhari' }],
        params: {
          name,
          email,
          phone: phone || 'Not provided',
          projectType: projectType || 'Not specified',
          preferredDate: preferredDate || 'Not specified',
          message,
        },
        subject: `New Quote Request from ${name}`,
      }),
    });

    if (!notificationResponse.ok) {
      // response.json() is untyped; cast to typed object to prevent unsafe-any warnings
      const errorData = (await notificationResponse.json()) as { error?: string };
      console.error('Brevo API error:', errorData);
      return res.status(500).json({ error: 'Failed to send quote notification' });
    }

    // Send auto-reply to client (if template ID is configured)
    if (clientReplyTemplateId) {
      const replyResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
      },
      body: JSON.stringify({
          sender: { email: 'contact@qasim.live', name: 'Qasim Bokhari' },
          templateId: parseInt(clientReplyTemplateId),
          to: [{ email, name }],
          params: {
            name,
          },
        }),
      });

      if (!replyResponse.ok) {
        // response.json() is untyped; cast to typed object to prevent unsafe-any warnings
        const replyError = (await replyResponse.json()) as { error?: string };
        console.error('Client auto-reply error:', replyError);
        // Don't fail the request if auto-reply fails - notification was sent successfully
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
