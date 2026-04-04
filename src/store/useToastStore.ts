'use client'

import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
  id: string
  type: ToastType
  message: string
  duration: number
}

type ToastState = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((s) => ({
      toasts: [...s.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
