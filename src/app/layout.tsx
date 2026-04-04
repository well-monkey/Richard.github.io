import type { ReactNode } from 'react'
import './globals.css'

// Root layout required by Next.js.
// HTML structure is provided by app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
