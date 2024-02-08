import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.scss'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '700'], style: 'normal' })

export const metadata: Metadata = {
  title: 'InstaScript',
  description: 'Automate your Instagram account with InstaScript'
}

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
