import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GliderBot - demo website',
  description: 'Website info for music discord bot created by: @mohanad8t',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
