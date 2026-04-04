'use client'

import { create } from 'zustand'

type UIState = {
  isSearchOpen: boolean
  isMobileNavOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleMobileNav: () => void
  closeMobileNav: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  isSearchOpen: false,
  isMobileNavOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
}))
