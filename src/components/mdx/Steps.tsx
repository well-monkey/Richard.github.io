import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 ml-4 border-l border-border pl-6 [&>h3]:mt-0 [&>h3]:font-semibold">
      {children}
    </div>
  )
}
