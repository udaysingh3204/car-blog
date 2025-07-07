import { Inter } from 'next/font/google'
import './globals.css'
import Header from './../components/Header'
import Footer from './../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Car Blog - Your Journey, Your Car, Your Way',
  description: 'Discover the latest car reviews, maintenance tips, and automotive insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}