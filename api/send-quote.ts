import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, projectType, preferredDate, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const templateId = process.env.BREVO_QUOTE_TEMPLATE_ID;

    if (!apiKey || !templateId) {
      console.error('Missing Brevo configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Send transactional email via Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        templateId: parseInt(templateId),
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
