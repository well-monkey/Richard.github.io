import NextLink from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<typeof NextLink>

export function Link({ href, children, ...props }: Props) {
  const isExternal =
    typeof href === 'string' && (href.startsWith('http') || href.startsWith('//'))

  return (
    <NextLink
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </NextLink>
  )
}
