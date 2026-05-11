import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/security';
import { stripHtml } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting (Max 3 messages per hour per IP)
    const rateLimitResult = rateLimit(req, 'contact-api', 3, 60 * 60 * 1000);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    
    // 2. Input Sanitization
    const name = stripHtml(body.name || '').trim();
    const email = stripHtml(body.email || '').trim();
    const message = stripHtml(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, 
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`, // Note: strictly speaking, your SMTP provider might force 'from' to be authenticated email
        to: 'illanthoodhu32@gmail.com',
        replyTo: email,
        subject: `Website Contact from ${name}`,
        text: message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
