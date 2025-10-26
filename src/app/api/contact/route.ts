import { NextRequest, NextResponse } from 'next/server'
import { ContactForm } from '@/types'
import { contactService, leadService } from '@/lib/database'
import { notificationService } from '@/lib/notification'

export async function POST(request: NextRequest) {
  try {
    const formData: ContactForm = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Save to in-memory database
    const savedForm = contactService.save(formData)
    
    // Create a lead from the contact form
    leadService.create({
      name: formData.name,
      email: formData.email,
      source: 'contact_form'
    })

    // Log the form data
    console.log('Contact form submission:', {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'website_contact_form'
    })

    // Send immediate notification
    const result = await notificationService.notify(formData)
    console.log('Form processing result:', result)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send your message. Please try again or contact us directly.',
        fallbackEmail: 'jai@reddot.co.in'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Test email configuration
  let emailConfigured = false;
  let emailError = null;
  
  // Email configuration check - simplified for now
  if (process.env.CONTACT_EMAIL) {
    emailConfigured = true;
  }
  
  return NextResponse.json({
    status: 'Contact form API is online',
    endpoint: '/api/contact',
    method: 'POST',
    requiredFields: ['name', 'email', 'message'],
    optionalFields: ['service', 'budget', 'timeline'],
    email: {
      configured: emailConfigured,
      contactEmail: process.env.CONTACT_EMAIL,
      error: emailError
    }
  })
}
