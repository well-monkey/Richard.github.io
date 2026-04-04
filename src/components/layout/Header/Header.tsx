import { Link } from '@/i18n/navigation'
import { Nav } from './Nav'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '@/components/base/ThemeToggle'
import { LocaleSwitcher } from '@/components/base/LocaleSwitcher'
import { ColorThemePicker } from '@/components/base/ColorThemePicker'
import { siteConfig } from '@/config/site'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href="/" className="mr-6 flex items-center font-bold">
          {siteConfig.name}
        </Link>
        <Nav />
        <div className="flex flex-1 items-center justify-end gap-2">
          <ColorThemePicker />
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
