import type { Metadata } from 'next'
import { Inter, Playfair_Display, Lora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})
const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora'
})

export const metadata: Metadata = {
  title: 'African and Pregnant',
  description: 'A comprehensive resource for maternal health in Africa',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#1e40af',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${lora.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-gray-50 antialiased">
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
