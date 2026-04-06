import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const css = readFileSync(resolve(__dirname, '../app/globals.css'), 'utf-8')

const REQUIRED_VARS = [
  '--color-primary',
  '--color-primary-foreground',
  '--color-secondary',
  '--color-secondary-foreground',
  '--color-muted',
  '--color-muted-foreground',
  '--color-accent',
  '--color-accent-foreground',
  '--color-border',
  '--color-input',
  '--color-ring',
]

const COLOR_THEMES = ['purple', 'green', 'orange'] as const

describe('globals.css Color Theme Completeness', () => {
  for (const theme of COLOR_THEMES) {
    describe(`[data-color="${theme}"] (light)`, () => {
      // Extract the light block for this theme
      const lightBlockRegex = new RegExp(
        `\\[data-color="${theme}"\\]\\s*\\{([^}]+)\\}`,
      )
      const lightMatch = css.match(lightBlockRegex)

      it('should have a light mode block', () => {
        expect(lightMatch, `Missing [data-color="${theme}"] block`).not.toBeNull()
      })

      if (lightMatch) {
        for (const varName of REQUIRED_VARS) {
          it(`should define ${varName}`, () => {
            expect(
              lightMatch[1],
              `[data-color="${theme}"] missing ${varName}`,
            ).toContain(varName)
          })
        }
      }
    })

    describe(`[data-theme="dark"][data-color="${theme}"] (dark)`, () => {
      const darkBlockRegex = new RegExp(
        `\\[data-theme="dark"\\]\\[data-color="${theme}"\\]\\s*\\{([^}]+)\\}`,
      )
      const darkMatch = css.match(darkBlockRegex)

      it('should have a dark mode block', () => {
        expect(darkMatch, `Missing dark block for "${theme}"`).not.toBeNull()
      })

      if (darkMatch) {
        for (const varName of REQUIRED_VARS) {
          it(`should define ${varName}`, () => {
            expect(
              darkMatch[1],
              `dark [data-color="${theme}"] missing ${varName}`,
            ).toContain(varName)
          })
        }
      }
    })
  }

  it('default (blue) light theme should define all vars in @theme block', () => {
    const themeBlock = css.match(/@theme\s*\{([^}]+)\}/)
    expect(themeBlock).not.toBeNull()
    for (const varName of REQUIRED_VARS) {
      expect(themeBlock![1]).toContain(varName)
    }
  })
})
