'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ColorTheme = 'blue' | 'purple' | 'green' | 'orange'

const STORAGE_KEY = 'color-theme'
const DEFAULT_COLOR: ColorTheme = 'blue'

type ColorThemeContextValue = {
  color: ColorTheme
  setColor: (color: ColorTheme) => void
}

const ColorThemeContext = createContext<ColorThemeContextValue>({
  color: DEFAULT_COLOR,
  setColor: () => {},
})

export function useColorTheme() {
  return useContext(ColorThemeContext)
}

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColorState] = useState<ColorTheme>(DEFAULT_COLOR)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ColorTheme | null
    const initial = stored ?? DEFAULT_COLOR
    setColorState(initial)
    applyColor(initial)
  }, [])

  const setColor = (next: ColorTheme) => {
    setColorState(next)
    applyColor(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <ColorThemeContext.Provider value={{ color, setColor }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var c=localStorage.getItem('${STORAGE_KEY}');if(c&&c!=='blue')document.documentElement.dataset.color=c;})()`,
        }}
      />
      {children}
    </ColorThemeContext.Provider>
  )
}

function applyColor(color: ColorTheme) {
  if (color === 'blue') {
    delete document.documentElement.dataset.color
  } else {
    document.documentElement.dataset.color = color
  }
}
