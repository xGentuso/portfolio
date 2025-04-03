import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Validate environment variables
const validateEnvVariables = () => {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER is not defined in environment variables');
  }
  if (!process.env.EMAIL_PASS) {
    throw new Error('EMAIL_PASS is not defined in environment variables');
  }
  return true;
};

// Create a transporter using Gmail with more secure settings
const createTransporter = () => {
  validateEnvVariables();
  
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: true
    }
  });
};

export async function POST(request: Request) {
  try {
    // Validate environment variables first
    validateEnvVariables();

    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify SMTP connection before sending
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP Verification Error:', error);
      return NextResponse.json(
        { 
          error: 'Email service configuration error', 
          details: error instanceof Error ? error.message : 'Failed to verify SMTP connection'
        },
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
    console.error('Detailed error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
} 