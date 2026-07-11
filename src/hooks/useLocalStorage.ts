import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (nextValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const valueToStore =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T) => T)(prev)
          : nextValue

      localStorage.setItem(key, JSON.stringify(valueToStore))
      return valueToStore
    })
  }

  return [value, setStoredValue] as const
}
