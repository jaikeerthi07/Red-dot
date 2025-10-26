import { NextResponse } from 'next/server'
import { analyticsService } from '@/lib/database'

export async function GET() {
  try {
    const stats = analyticsService.getStats()
    const allData = analyticsService.getAllData()

    return NextResponse.json({
      success: true,
      stats,
      data: {
        conversationsCount: allData.conversations.length,
        contactFormsCount: allData.contactForms.length,
        leadsCount: allData.leads.length,
        recentConversations: allData.conversations.slice(-5).map(conv => ({
          id: conv.id,
          messageCount: conv.messages.length,
          startedAt: conv.startedAt,
          status: conv.status
        })),
        recentContactForms: allData.contactForms.slice(-5).map(form => ({
          name: form.name,
          email: form.email,
          service: form.service,
          submittedAt: form.submittedAt
        })),
        recentLeads: allData.leads.slice(-5).map(lead => ({
          id: lead.id,
          name: lead.name,
          email: lead.email,
          source: lead.source,
          status: lead.status,
          createdAt: lead.createdAt
        }))
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Analytics API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}