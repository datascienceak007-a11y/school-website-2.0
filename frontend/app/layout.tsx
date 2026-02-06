import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import AnnouncementTicker from '@/components/AnnouncementTicker'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Excellence Academy - Premier Education Institution',
  description: 'Excellence Academy offers world-class education across 3 branches. Admissions open for 2025-26. Apply now for a brighter future.',
  keywords: 'school, education, admissions, academy, excellence, learning',
  authors: [{ name: 'Excellence Academy' }],
  openGraph: {
    title: 'Excellence Academy - Premier Education Institution',
    description: 'World-class education across 3 branches. Admissions open!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <Navigation />
        <AnnouncementTicker />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
