import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Validate environment variables
const validateEnvVariables = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('Environment Check:', {
    hasEmailUser: !!emailUser,
    hasEmailPass: !!emailPass,
    emailUserLength: emailUser?.length || 0,
    emailPassLength: emailPass?.length || 0
  });

  if (!emailUser) {
    throw new Error('EMAIL_USER is not defined in environment variables');
  }
  if (!emailPass) {
    throw new Error('EMAIL_PASS is not defined in environment variables');
  }
  return true;
};

// Create a transporter using Gmail with more permissive settings
const createTransporter = () => {
  validateEnvVariables();
  
  const transportConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    debug: true
  };

  console.log('Creating transporter with config:', {
    ...transportConfig,
    auth: {
      user: transportConfig.auth.user,
      pass: '**hidden**'
    }
  });

  return nodemailer.createTransport(transportConfig);
};

export async function POST(request: Request) {
  console.log('Starting email send process...');
  
  try {
    // Validate environment variables first
    validateEnvVariables();

    const { name, email, message } = await request.json();
    console.log('Received form data:', { name, email, messageLength: message?.length });

    // Validate the input
    if (!name || !email || !message) {
      console.log('Validation failed:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify SMTP connection before sending
    try {
      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP Verification Error:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      
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
      to: process.env.EMAIL_USER, // Send to the same email
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    console.log('Attempting to send email with options:', {
      ...mailOptions,
      text: `${mailOptions.text.substring(0, 50)}...`
    });

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent successfully:', info);

    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Detailed error:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
} 