import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA') // Returns YYYY-MM-DD format using local timezone
}

export function getCurrentDate(): Date {
  const now = new Date()
  // Get local date components
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  // Create new date using local components (this ensures we're using local midnight)
  return new Date(year, month, day)
}

export function parseRelativeDate(dateStr: string): Date | null {
  const today = getCurrentDate()
  
  // Convert to lowercase for easier matching
  dateStr = dateStr.toLowerCase()

  if (dateStr === 'today') {
    return today
  }

  if (dateStr === 'yesterday') {
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    return yesterday
  }

  // Match "last week [day]" pattern
  const lastWeekMatch = dateStr.match(/last week (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/)
  if (lastWeekMatch) {
    const days = {
      'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
      'thursday': 4, 'friday': 5, 'saturday': 6
    }
    const targetDay = days[lastWeekMatch[1] as keyof typeof days]
    const date = new Date(today)
    date.setDate(today.getDate() - 7 - today.getDay() + targetDay)
    return date
  }

  // Match "[day] last week" pattern
  const dayLastWeekMatch = dateStr.match(/(monday|tuesday|wednesday|thursday|friday|saturday|sunday) last week/)
  if (dayLastWeekMatch) {
    const days = {
      'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
      'thursday': 4, 'friday': 5, 'saturday': 6
    }
    const targetDay = days[dayLastWeekMatch[1] as keyof typeof days]
    const date = new Date(today)
    date.setDate(today.getDate() - 7 - today.getDay() + targetDay)
    return date
  }

  // Match "last [day]" pattern
  const lastDayMatch = dateStr.match(/last (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/)
  if (lastDayMatch) {
    const days = {
      'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
      'thursday': 4, 'friday': 5, 'saturday': 6
    }
    const targetDay = days[lastDayMatch[1] as keyof typeof days]
    const date = new Date(today)
    let diff = today.getDay() - targetDay
    if (diff <= 0) diff += 7
    date.setDate(today.getDate() - diff)
    return date
  }

  // Match "[number]th/st/rd of this month" pattern
  const dayOfMonthMatch = dateStr.match(/(\d+)(?:st|nd|rd|th) (?:of )?this month/)
  if (dayOfMonthMatch) {
    const day = parseInt(dayOfMonthMatch[1])
    if (day >= 1 && day <= 31) {
      const date = new Date(today)
      date.setDate(day)
      return date
    }
  }

  return null
}
