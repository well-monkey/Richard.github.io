import { describe, it, expect } from 'vitest'
import en from '../../messages/en.json'
import zh from '../../messages/zh.json'

describe('i18n Message Completeness', () => {
  it('en.json and zh.json should have the same top-level keys', () => {
    const enKeys = Object.keys(en).sort()
    const zhKeys = Object.keys(zh).sort()
    expect(enKeys).toEqual(zhKeys)
  })

  it('each namespace should have the same keys in both languages', () => {
    for (const namespace of Object.keys(en) as (keyof typeof en)[]) {
      const enNsKeys = Object.keys(en[namespace]).sort()
      const zhNsKeys = Object.keys(zh[namespace]).sort()
      expect(enNsKeys, `Mismatch in namespace "${namespace}"`).toEqual(zhNsKeys)
    }
  })

  it('theme namespace should include color names', () => {
    const requiredKeys = ['toggle', 'color', 'blue', 'purple', 'green', 'orange', 'light', 'dark', 'system']
    for (const key of requiredKeys) {
      expect(en.theme, `en.theme missing "${key}"`).toHaveProperty(key)
      expect(zh.theme, `zh.theme missing "${key}"`).toHaveProperty(key)
    }
  })

  it('blog namespace should include tag translations', () => {
    expect(en.blog).toHaveProperty('tag_title')
    expect(en.blog).toHaveProperty('tagged_posts')
    expect(zh.blog).toHaveProperty('tag_title')
    expect(zh.blog).toHaveProperty('tagged_posts')
  })

  it('no translation value should be empty string', () => {
    for (const namespace of Object.keys(en) as (keyof typeof en)[]) {
      for (const [key, value] of Object.entries(en[namespace])) {
        expect(value, `en.${namespace}.${key} is empty`).not.toBe('')
      }
      for (const [key, value] of Object.entries(zh[namespace])) {
        expect(value, `zh.${namespace}.${key} is empty`).not.toBe('')
      }
    }
  })
})
