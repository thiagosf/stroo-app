import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export interface StructureFilters {
  search: string;
  type: string;
  favorites: boolean;
}

export function useStructureFilters() {
  const router = useRouter()
  // @todo use StructureFilters type instead of any
  const [filters, setFilters] = useState<any>({
    search: '',
    type: '',
    favorites: false,
  })
  const interval = useRef<any>()

  function changeFilter(field: string, value: string | boolean) {
    const newFilters = { ...filters, [field]: value }
    setFilters(() => newFilters)

    const delay = field !== 'favorites' ? 500 : 0
    clearTimeout(interval.current)
    interval.current = setTimeout(() => router.push({ query: newFilters }), delay)
  }

  useEffect(() => {
    return () => clearTimeout(interval.current)
  }, [])

  return [filters, changeFilter]
}
