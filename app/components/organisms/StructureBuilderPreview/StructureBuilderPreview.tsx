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
import { FOLDER_SEPARATOR, parse } from '../../../helpers/folder_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { CREATE_STRUCTURE, DESTROY_STRUCTURE, UPDATE_STRUCTURE } from '../../../queries/structure_queries'
import { getStructureLink } from '../../../helpers/structure_utils'
import { useLocalStorage } from '../../../hooks/use_local_storage'

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
  entity: StructureEntity;
  startMode?: Mode;
  onFavorite?: (entity: StructureEntity) => void;
  onComplain?: (entity: StructureEntity) => void;
}

export const StructureBuilderPreview: React.FC<Props> = function ({ entity, startMode, onFavorite, onComplain }) {
  const router = useRouter()
  const markdowWrapperRef = useRef<HTMLDivElement>()
  const [savedStructureEntity, setSavedStructureEntity] = useLocalStorage<any>('saved_structure_entity', {})
  const userContextValue = useContext(UserContext)
  const [createStructure] = useMutation(CREATE_STRUCTURE)
  const [updateStructure] = useMutation(UPDATE_STRUCTURE)
  const [destroyStructure] = useMutation(DESTROY_STRUCTURE)

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
              router.push(getStructureLink(data.createStructure))
            } else {
              // @todo show errors
            }
          },
          onError(error) {
            // @todo show error
            setIsSending(() => false)
            console.log('createStructure::error', error)
          }
        })
      } else {
        payload.code = currentStructureEntity?.code
        await updateStructure({
          variables: payload,
          onCompleted(data) {
            setIsSending(() => false)
            if (data) {
              setSavedStructureEntity({})
              router.push(getStructureLink(data.updateStructure))
            } else {
              // @todo show errors
            }
          },
          onError(error) {
            // @todo show error
            setIsSending(() => false)
            console.log('updateStructure::error', error)
          }
        })
      }
    } else {
      openModal()
    }
  }

  async function onDuplicate() {
    setIsDuplicating(true)
    setSavedStructureEntity(currentStructureEntity)
    router.push('/new')
  }

  async function onNew() {
    setSavedStructureEntity({})
    router.push('/new')
  }

  async function handleDestroy() {
    if (confirm('Are you sure?!')) {
      setIsSending(() => true)
      destroyStructure({
        variables: { code: entity.code },
        onCompleted(data) {
          setIsSending(() => false)
          router.push('/')
        },
        onError(error) {
          // @todo show error
          setIsSending(() => false)
          console.log('destroyStructure::error', error)
        }
      })
    }
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
    setCurrentStructureEntity((data) => ({
      ...data,
      name: savedStructureEntity?.name ?? entity.name,
      type: savedStructureEntity?.type ?? entity.type,
      content: savedStructureEntity?.content ?? entity.content,
    }))
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
              {!isNew && (
                <Button
                  filled
                  onClick={onNew}
                >new</Button>
              )}
            </>
          </Header>
          {isPreviewing && (
            <div className="flex-grow overflow-x-auto" ref={markdowWrapperRef}>
              <div className="max-w-4xl">
                <MarkdownPreview
                  value={currentStructureEntity?.content}
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