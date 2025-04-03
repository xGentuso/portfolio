import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail with more secure settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Only for development
  }
});

export async function POST(request: Request) {
  try {
    // Log environment variables (remove in production)
    console.log('Attempting to send email with following configuration:');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass length:', process.env.EMAIL_PASS?.length || 0);

    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Verify SMTP connection before sending
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP Verification Error:', verifyError);
      return NextResponse.json(
        { error: 'Email service configuration error', details: verifyError.message },
        { status: 500 }
      );
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ryancodes00@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent successfully:', info.messageId);

    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 