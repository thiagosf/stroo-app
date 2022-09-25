import { useRouter } from 'next/router'
import { useState } from 'react'

export interface StructureFilters {
  favorites: boolean;
}

export function useStructureFilters() {
  const router = useRouter()
  const [filters, setFilters] = useState<any>({
    favorites: false,
  })

  function changeFilter(field: string, value: any) {
    const newFilters = { ...filters, [field]: value }
    setFilters(() => newFilters)
    router.push({ query: newFilters })
  }

  return [filters, changeFilter]
}
