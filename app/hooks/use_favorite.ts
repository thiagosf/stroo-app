import { useContext } from 'react'

import { UserContext } from '../contexts/user_context'
import { StructureEntity } from '../pages/[username]/[slug]'

export function useFavorite() {
  const userContextValue = useContext(UserContext)

  async function onFavorite(entity: StructureEntity) {
    if (!userContextValue.currentUser) {
      userContextValue.openModal()
    } else {
      console.log('useFavorite', entity)
    }
  }

  return [onFavorite]
}
