import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vitra - Amazon PPC Audit',
  description: 'Get a free Amazon PPC audit and discover your wasted ad budget',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
