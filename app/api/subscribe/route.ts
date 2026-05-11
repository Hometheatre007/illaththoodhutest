import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SPAM_LIST_URL = 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf';

// Minimal Sanity mutation fallback using pure fetch if client SDK has issues
const SANITY_MUTATION_URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 1. Fetch Disposable Blocklist
    let isDisposable = false;
    try {
      const resp = await fetch(SPAM_LIST_URL);
      if (resp.ok) {
        const text = await resp.text();
        const domains = new Set(text.split('\\n').filter(Boolean));
        const domain = email.split('@')[1];
        if (domains.has(domain)) {
          isDisposable = true;
        }
      }
    } catch(err) {
      console.error('Failed to parse disposable list', err);
    }

    if (isDisposable) {
      return NextResponse.json({ error: 'Please use a valid email address (disposable emails not allowed)' }, { status: 400 });
    }

    // 2. Save to Sanity CMS (Newsletter Schema)
    if (process.env.SANITY_API_TOKEN) {
      await fetch(SANITY_MUTATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: 'newsletter',
                email,
                isValid: true,
                subscribedAt: new Date().toISOString()
              }
            }
          ]
        })
      });
    } else {
      console.warn("SANITY_API_TOKEN not found, skipping save to CMS");
    }

    // 3. Send Welcome Email via Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Ilanthoodhu" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Welcome to Ilanthoodhu Newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0B3D2E; color: #F5F0E8; padding: 40px;">
            <h1 style="color: #C9A84C; text-align: center;">இளந்தாது</h1>
            <p><strong>Thank you for subscribing to Ilanthoodhu!</strong></p>
            <p>You will now receive updates on our latest literary editions, notices, and events from Sacred Heart College.</p>
            <p style="margin-top: 40px; font-size: 12px; color: #888;">The Voice of Student Expression since 1987.</p>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe API Error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
