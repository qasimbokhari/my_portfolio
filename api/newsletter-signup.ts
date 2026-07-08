import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
    const welcomeTemplateId = process.env.BREVO_NEWSLETTER_WELCOME_TEMPLATE_ID;

    if (!apiKey || !listId) {
      console.error('Missing Brevo configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Add contact to Brevo list via API
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(listId)],
        updateEnabled: true,
        attributes: {
          SOURCE: 'Website Footer',
        },
      }),
    });

    // Handle duplicate contact gracefully - treat as success
    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      
      // If it's a duplicate email error, treat it as success
      if (contactResponse.status === 400 && errorData.code === 'duplicate_parameter') {
        console.log('Contact already exists, proceeding with welcome email');
      } else {
        console.error('Brevo API error:', errorData);
        return res.status(500).json({ error: 'Failed to subscribe to newsletter' });
      }
    }

    // Send welcome email via transactional email API
    if (welcomeTemplateId) {
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          templateId: parseInt(welcomeTemplateId),
          to: [{ email }],
          params: {
            email,
          },
        }),
      });

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json();
        console.error('Welcome email error:', emailError);
        // Don't fail the request if welcome email fails - contact was added successfully
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
