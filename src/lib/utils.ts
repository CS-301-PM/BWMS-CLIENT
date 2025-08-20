import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiError } from '../types'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Format date
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError
    if (apiError.error) {
      return apiError.error
    }
  }
  
  return 'An unknown error occurred'
}

export function getValidationErrors(error: unknown): Record<string, string[]> {
  const apiError = error as ApiError
  return apiError.details || {}
}