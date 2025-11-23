export default {
  async fetch(request, env) {
    // 1. Handle CORS (Allow your portfolio and local dev to talk to this worker)
    const allowedOrigins = ['https://echia.xyz', 'http://localhost:5173', 'http://localhost:3000'];
    const origin = request.headers.get('Origin');
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'https://echia.xyz',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle "Preflight" checks from browser
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const { name, email, message, token } = body;

      if (!name || !email || !message || !token) {
        return new Response(JSON.stringify({ error: 'Missing input' }), { status: 400, headers: corsHeaders });
      }

      // 2. Verify Turnstile CAPTCHA
      const formData = new FormData();
      formData.append('secret', env.TURNSTILE_SECRET_KEY);
      formData.append('response', token);
      formData.append('remoteip', request.headers.get('CF-Connecting-IP'));

      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });
      
      const turnstileOutcome = await turnstileRes.json();
      if (!turnstileOutcome.success) {
        return new Response(JSON.stringify({ error: 'Invalid CAPTCHA' }), { status: 403, headers: corsHeaders });
      }

      // 3. Send Email via Resend API
      // IMPORTANT: Ensure 'RESEND_API_KEY' is set in your Cloudflare Worker secrets
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MSG Uplink <contact@echia.xyz>', // Must match verified domain in Resend
          to: ['gmeal6889@gmail.com'], // Where you want to receive it
          reply_to: email,
          subject: `New Message from ${name}`,
          html: `
            <h3>New Contact Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px;">${message}</blockquote>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errorText = await emailRes.text();
        throw new Error(`Resend API Error: ${errorText}`);
      }

      // 4. Success Response
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
