import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  PathTopPosition,
  StructureContext,
  StructureContextProps
} from '../../../contexts/structure_context'
import { UserContext } from '../../../contexts/user_context'
import { FOLDER_SEPARATOR, parse, replaceTitlesByIndexes } from '../../../helpers/folder_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { CREATE_STRUCTURE, DESTROY_STRUCTURE, UPDATE_STRUCTURE } from '../../../queries/structure_queries'
import { getStructureLink } from '../../../helpers/structure_utils'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { SiteContext } from '../../../contexts/site_context'
import { getEmoji, randomEmoji } from '../../../helpers/emoji'
import { unauthenticatedUser } from '../../../helpers/user_utils'

import { Button } from '../../molecules/Button/Button'

import { MarkdownPreview } from '../MarkdownPreview/MarkdownPreview'
import { Structure } from '../Structure/Structure'
import { StructureInfo } from '../StructureInfo/StructureInfo'
import { StructureForm } from '../StructureForm/StructureForm'
import { Header } from '../Header/Header'

export enum Mode {
  PREVIEW = 'preview',
  EDITOR = 'editor'
}

export interface Props {
  startMode?: Mode;
  onFavorite?: (entity: StructureEntity) => Promise<void>;
  onComplain?: (entity: StructureEntity) => Promise<void>;
}

export const StructureBuilderPreview: React.FC<Props> = function ({ startMode, onFavorite, onComplain }) {
  const router = useRouter()
  const siteContextValue = useContext(SiteContext)
  const userContextValue = useContext(UserContext)
  const markdowWrapperRef = useRef<HTMLDivElement>()
  const [createStructure] = useMutation(CREATE_STRUCTURE)
  const [updateStructure] = useMutation(UPDATE_STRUCTURE)
  const [destroyStructure] = useMutation(DESTROY_STRUCTURE)
  const [savedStructureEntity, setSavedStructureEntity] = useLocalStorage<any>('saved_structure_entity', {})

  const [markdowWrapperTop, setMarkdowWrapperTop] = useState(0)
  const [structureValues, setStructureValues] = useState<StructureContextProps>({
    currentPath: [],
    clickFrom: null,
    pathsTopPositions: [],
    dispatch: (key: string, value: any) => {
      setStructureValues((v) => ({
        ...v,
        [key]: value
      }))
    },
  })
  const entity = siteContextValue.structure
  const [isSending, setIsSending] = useState(false)
  const [folderData, setFolderData] = useState(parse(entity.content))
  const [currentStructureEntity, setCurrentStructureEntity] = useState<StructureEntity>(entity)
  const [mode, setMode] = useState<Mode>(startMode ?? Mode.PREVIEW)
  const [isDuplicating, setIsDuplicating] = useState(false)

  const isNew = router.pathname === '/new'
  const isPreviewing = mode === Mode.PREVIEW
  const isEditing = mode === Mode.EDITOR
  const currentUserIsOwner = userContextValue.currentUser?.username === entity.user.username
  const showEditorButton = isNew || currentUserIsOwner
  const preview = replaceTitlesByIndexes(currentStructureEntity?.content)

  function handleChangeInput(field: string, value: string) {
    if (field === 'content') {
      setFolderData(parse(value ?? ''))
    }
    setCurrentStructureEntity((values) => ({
      ...values,
      [field]: value
    }))
  }

  function changeMode(newMode: Mode) {
    return () => {
      setMode(newMode)
    }
  }

  async function handleSave() {
    if (isSending) return
    const { currentUser, openModal } = userContextValue

    if (currentUser) {
      setIsSending(() => true)
      const payload: any = {
        input: {
          type: currentStructureEntity?.type,
          name: currentStructureEntity?.name,
          content: currentStructureEntity?.content
        }
      }
      if (!currentStructureEntity?.code || currentStructureEntity?.code === '...') {
        await createStructure({
          variables: payload,
          onCompleted(data) {
            setIsSending(() => false)
            if (data) {
              setSavedStructureEntity({})
              siteContextValue.setAlert({
                icon: randomEmoji('happy'),
                title: 'Structure created successfully!',
              })
              router.push(getStructureLink(data.createStructure))
            } else {
              siteContextValue.setAlert({
                icon: randomEmoji('unhappy'),
                title: JSON.stringify(data.error),
                delay: 10000,
              })
            }
          },
          onError(error) {
            setIsSending(() => false)
            siteContextValue.setAlert({
              icon: randomEmoji('unhappy'),
              title: error.message,
              delay: 10000,
            })
          }
        })
      } else {
        payload.code = currentStructureEntity?.code
        await updateStructure({
          variables: payload,
          onCompleted(data) {
            setIsSending(() => false)
            if (data) {
              siteContextValue.setAlert({
                icon: randomEmoji('happy'),
                title: 'Structure updated successfully!',
              })
              siteContextValue.setStructure(currentStructureEntity)
              setSavedStructureEntity({})
              router.push(getStructureLink(data.updateStructure))
            } else {
              siteContextValue.setAlert({
                icon: randomEmoji('unhappy'),
                title: JSON.stringify(data.error),
                delay: 10000,
              })
            }
          },
          onError(error) {
            setIsSending(() => false)
            siteContextValue.setAlert({
              icon: randomEmoji('unhappy'),
              title: error.message, delay: 10000,
            })
          }
        })
      }
    } else {
      openModal()
    }
  }

  async function onDuplicate() {
    setIsDuplicating(true)
    setSavedStructureEntity({
      ...currentStructureEntity,
      code: '...',
      user: userContextValue.currentUser
        ? { ...userContextValue.currentUser }
        : { ...unauthenticatedUser() },
    })
    router.push('/new')
  }

  async function onNew() {
    setSavedStructureEntity({})
    router.push('/new')
  }

  async function handleDestroy() {
    siteContextValue.setAlert({
      icon: getEmoji('warning'),
      title: 'Are you sure?!',
      delay: 30000,
      onConfirm: () => {
        setIsSending(() => true)
        destroyStructure({
          variables: { code: entity.code },
          onCompleted() {
            setIsSending(() => false)
            siteContextValue.cleanAlert()
            router.push(`/@${userContextValue.currentUser.username}`)
          },
          onError(error) {
            setIsSending(() => false)
            siteContextValue.setAlert({
              icon: randomEmoji('unhappy'),
              title: error.message,
              delay: 10000,
            })
          }
        })
      },
      onCancel: () => {
        siteContextValue.cleanAlert()
      }
    })
  }

  const handleFocus = useCallback((path: string) => {
    structureValues.dispatch('currentPath', path.split(FOLDER_SEPARATOR))
    structureValues.dispatch('clickFrom', 'title')
  }, [])

  const onMountElements = useCallback((pathsTopPositions: Array<PathTopPosition>) => {
    structureValues.dispatch('pathsTopPositions', pathsTopPositions)
  }, [])

  useEffect(() => {
    if (markdowWrapperRef.current) {
      const rect = markdowWrapperRef.current.getClientRects()
      setMarkdowWrapperTop(rect.item(0).y)
    }
  }, [markdowWrapperRef])

  useEffect(() => {
    if (structureValues.clickFrom === 'item') {
      const currentPath = structureValues.currentPath.join(FOLDER_SEPARATOR)
      const item = structureValues.pathsTopPositions.find((item) => {
        return item.path === currentPath
      })
      if (item && markdowWrapperRef.current) {
        const top = item.top - markdowWrapperTop
        markdowWrapperRef.current.scrollTo({
          top,
          behavior: 'smooth',
        })
      }
    }
  }, [markdowWrapperTop, structureValues.currentPath, structureValues.clickFrom])

  useEffect(() => {
    if (isNew) {
      setCurrentStructureEntity((data) => ({
        ...data,
        code: savedStructureEntity?.code ?? entity.code,
        name: savedStructureEntity?.name ?? entity.name,
        type: savedStructureEntity?.type ?? entity.type,
        content: savedStructureEntity?.content ?? entity.content,
        user: savedStructureEntity?.user ?? userContextValue.currentUser ?? entity.user,
      }))
      setFolderData(parse(savedStructureEntity?.content ?? entity.content))
    }
  }, [])

  useEffect(() => {
    if (userContextValue.currentUser && currentUserIsOwner) {
      setCurrentStructureEntity((data) => ({
        ...data,
        user: {
          name: userContextValue.currentUser.name,
          username: userContextValue.currentUser.username,
          avatar: userContextValue.currentUser.avatar,
        },
      }))
    }
  }, [userContextValue.currentUser, currentUserIsOwner])

  useEffect(() => {
    if ((currentUserIsOwner || isNew) && isEditing) {
      setSavedStructureEntity(currentStructureEntity)
    }
  }, [currentStructureEntity, currentUserIsOwner, isEditing, isNew])

  useEffect(() => {
    if (currentUserIsOwner && isEditing) {
      setSavedStructureEntity({})
    }
  }, [currentUserIsOwner, isEditing])

  useEffect(() => {
    if (!isNew) {
      setCurrentStructureEntity((data) => ({
        ...data,
        like_count: entity.like_count,
        liked: entity.liked
      }))
    }
  }, [entity.liked, entity.like_count])

  useEffect(() => {
    if (!isNew && currentStructureEntity.code !== entity.code) {
      setCurrentStructureEntity(entity)
      setFolderData(parse(entity.content))
    }
  }, [entity.code])

  useEffect(() => {
    return () => {
      if (!isNew) siteContextValue.setStructure(null)
    }
  }, [])

  return (
    <StructureContext.Provider value={structureValues}>
      <div className="flex flex-col flex-grow lg:flex-row">
        <div className="flex flex-1 bg-gradient-to-tl from-red-700 to-purple-800 justify-end">
          <div className="p-12 flex-grow h-full flex flex-col max-w-4xl">
            <div className="flex-shrink-0">
              <StructureInfo
                entity={currentStructureEntity}
                onFavorite={onFavorite}
                onComplain={onComplain}
              />
            </div>
            <div className="flex-grow mt-8 relative">
              <Structure data={folderData} />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <Header>
            <>
              <div className="mr-4">
                <Button
                  bordered
                  disabled={isPreviewing}
                  onClick={changeMode(Mode.PREVIEW)}
                >preview</Button>
              </div>
              <div className="mr-4">
                {showEditorButton && (
                  <Button
                    bordered
                    disabled={isEditing}
                    onClick={changeMode(Mode.EDITOR)}
                  >editor</Button>
                )}
                {!showEditorButton && (
                  <Button
                    bordered
                    onClick={onDuplicate}
                    spinner={isDuplicating}
                    disabled={isDuplicating}
                  >duplicate</Button>
                )}
              </div>
            </>
          </Header>
          {isPreviewing && (
            <div className="flex-grow overflow-x-auto" ref={markdowWrapperRef}>
              <div className="max-w-4xl">
                <MarkdownPreview
                  value={preview}
                  originalValue={currentStructureEntity?.content}
                  onTitleClick={handleFocus}
                  onMountElements={onMountElements}
                />
              </div>
            </div>
          )}
          {isEditing && (
            <StructureForm
              entity={currentStructureEntity}
              isSending={isSending}
              onSave={handleSave}
              onChange={handleChangeInput}
              onFocus={handleFocus}
              onDestroy={handleDestroy}
            />
          )}
        </div>
      </div>
    </StructureContext.Provider>
  )
}
