import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { SiteContext } from '../contexts/site_context'

import { UserContext } from '../contexts/user_context'
import { randomEmoji } from '../helpers/emoji'
import { StructureEntity } from '../pages/[username]/[slug]'
import { DISLIKE, LIKE } from '../queries/user_like_queries'

export function useFavorite() {
  const siteContextValue = useContext(SiteContext)
  const userContextValue = useContext(UserContext)
  const [like] = useMutation(LIKE)
  const [dislike] = useMutation(DISLIKE)

  async function onFavorite(entity: StructureEntity) {
    if (!userContextValue.currentUser) {
      userContextValue.openModal()
    } else {
      if (!entity.liked) {
        like({
          variables: { code: entity.code },
          onCompleted: (data) => updateCounter(data.like, true),
          onError
        })
      } else {
        dislike({
          variables: { code: entity.code },
          onCompleted: (data) => updateCounter(data.dislike, false),
          onError
        })
      }
    }
  }

  function updateCounter(count: number, liked: boolean) {
    siteContextValue.setStructure({
      ...siteContextValue.structure,
      like_count: count,
      liked
    })
  }

  function onError(error: Error) {
    siteContextValue.setAlert({
      icon: randomEmoji('unhappy'),
      title: error.message
    })
  }

  return [onFavorite]
}
