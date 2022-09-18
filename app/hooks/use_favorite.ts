import { useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { SiteContext } from '../contexts/site_context'
import { UserContext } from '../contexts/user_context'
import { randomEmoji } from '../helpers/emoji'
import { StructureEntity } from '../pages/[username]/[slug]'
import { DISLIKE, LIKE } from '../queries/user_like_queries'

import { useLocalStorage } from './use_local_storage'

export function useFavorite() {
  const siteContextValue = useContext(SiteContext)
  const userContextValue = useContext(UserContext)
  const [lastAction, setLastAction] = useLocalStorage('last_action', null)
  const [like] = useMutation(LIKE)
  const [dislike] = useMutation(DISLIKE)

  async function onFavorite(entity: StructureEntity) {
    if (!userContextValue.currentUser) {
      setLastAction({ action: 'like', value: entity.code })
      userContextValue.openModal()
    } else {
      if (!entity.liked) {
        await like({
          variables: { code: entity.code },
          onCompleted: (data) => updateCounter(data.like, true),
          onError
        })
      } else {
        await dislike({
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

  useEffect(() => {
    async function applyLastAction() {
      if (
        siteContextValue.structure &&
        lastAction &&
        lastAction.action === 'like' &&
        userContextValue.currentUser
      ) {
        like({
          variables: { code: lastAction.value },
          onCompleted: (data) => {
            setLastAction(null)
            if (siteContextValue.structure.code === lastAction.value) {
              updateCounter(data.like, true)
            }
          },
          onError(error) {
            setLastAction(null)
            onError(error)
          }
        })
      }
    }

    applyLastAction()
  }, [siteContextValue.structure, userContextValue.currentUser, lastAction])

  return [onFavorite]
}
