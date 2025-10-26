import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChatProvider } from '@/components/chat/ChatProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'reddot.org.in - AI Agents, Automations, SaaS Apps & AI Education',
  description: 'Innovating with AI Agents, Multi-Agent Systems, and Intelligent Applications powered by Groq AI. Leading AI development, automation, and education services.',
  keywords: 'AI agents, automation, SaaS applications, AI education, Groq AI, multi-agent systems, machine learning, artificial intelligence',
  authors: [{ name: 'Jai Keerthi' }],
  creator: 'Jai Keerthi',
  publisher: 'reddot.org.in',
  openGraph: {
    title: 'reddot.org.in - AI Agents & Intelligent Applications',
    description: 'Innovating with AI Agents, Multi-Agent Systems, and Intelligent Applications powered by Groq AI.',
    url: 'https://reddot.org.in',
    siteName: 'reddot.org.in',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'reddot.org.in - AI Innovation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'reddot.org.in - AI Agents & Intelligent Applications',
    description: 'Innovating with AI Agents, Multi-Agent Systems, and Intelligent Applications powered by Groq AI.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  )
}