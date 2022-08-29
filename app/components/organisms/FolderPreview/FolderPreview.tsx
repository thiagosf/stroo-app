import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  PathTopPosition,
  StructureContext,
  StructureContextProps
} from '../../../contexts/structure_context'
import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { FOLDER_SEPARATOR, parse } from '../../../helpers/folder_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { CREATE_STRUCTURE } from '../../../queries/structure_queries'
import { getStructureLink } from '../../../helpers/structure_utils'

import { Button } from '../../molecules/Button/Button'
import { FormControl } from '../../molecules/FormControl/FormControl'
import { Logo } from '../../molecules/Logo/Logo'

import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor'
import { MarkdownPreview } from '../MarkdownPreview/MarkdownPreview'
import { Structure } from '../Structure/Structure'
import { StructureInfo } from '../StructureInfo/StructureInfo'
import { useLocalStorage } from '../../../hooks/use_local_storage'

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

export const FolderPreview: React.FC<Props> = function ({ entity, startMode, onFavorite, onComplain }) {
  const router = useRouter()
  const markdowWrapperRef = useRef<HTMLDivElement>()
  const [savedStructureEntity, setSavedStructureEntity] = useLocalStorage<any>('saved_structure_entity', {})
  const userContextValue = useContext(UserContext)
  const [createStructure] = useMutation(CREATE_STRUCTURE)

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
  const buttonLabel = currentUserIsOwner ? 'Update' : 'Publish'
  const showEditorButton = isNew || currentUserIsOwner

  function handleChangeEditor(value: string) {
    setCurrentStructureEntity((d) => ({ ...d, content: value }))
    setFolderData(parse(value ?? ''))
  }

  function handleChangeInput(field: string) {
    return (e: any) => {
      let value = e.target.value.trim().toLowerCase()
      if (e.target.value[e.target.value.length - 1] === ' ') {
        value += '-'
      }
      value = value.replace(/[^0-9a-z-]/ig, '')
      setCurrentStructureEntity((values) => ({
        ...values,
        [field]: value
      }))
    }
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
      try {
        await createStructure({
          variables: {
            type: currentStructureEntity?.type,
            name: currentStructureEntity?.name,
            content: currentStructureEntity?.content
          },
          onCompleted(data) {
            setIsSending(() => false)
            if (data) {
              setSavedStructureEntity({})
              router.push(getStructureLink(data.createStructure))
            } else {
              // @todo show errors
            }
          }
        })
      } catch (error) {
        console.log('error', error)
        setIsSending(() => false)
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
      if (item) {
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
          <div className="flex justify-between items-center px-12 py-6">
            <div className="flex flex-grow">
              <div className="mr-4">
                <Button
                  bordered
                  disabled={isPreviewing}
                  onClick={changeMode(Mode.PREVIEW)}
                >preview</Button>
              </div>
              <div className="">
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
            </div>
            <div className="">
              <Logo />
            </div>
          </div>
          <div className="flex-grow overflow-x-auto" ref={markdowWrapperRef}>
            {isPreviewing && (
              <div className="max-w-4xl">
                <MarkdownPreview
                  value={currentStructureEntity?.content}
                  onTitleClick={handleFocus}
                  onMountElements={onMountElements}
                />
              </div>
            )}
            {isEditing && (
              <MarkdownEditor
                initialValue={currentStructureEntity?.content}
                onChange={handleChangeEditor}
                onFocus={handleFocus}
              />
            )}
          </div>
          {isEditing && (
            <div className="flex flex-col px-12 py-6 border-t border-white border-opacity-10 bg-black bg-opacity-30 2xl:flex-row 2xl:justify-between 2xl:items-center">
              <div className="flex flex-col flex-grow mb-8 2xl:mb-0 lg:mr-10 lg:flex-row">
                <div className="flex-shrink-0 flex-grow mb-8 lg:mb-0 lg:mr-2">
                  <FormControl
                    label="name"
                    value={currentStructureEntity?.name}
                    onChange={handleChangeInput('name')}
                  />
                </div>
                <div className="flex-shrink-0 flex-grow lg:ml-2">
                  <FormControl
                    label="type (react, vue, kotlin, etc)"
                    value={currentStructureEntity?.type}
                    onChange={handleChangeInput('type')}
                  />
                </div>
              </div>
              <Button
                filled
                size="large"
                spinner={isSending}
                disabled={isSending}
                onClick={handleSave}
              >{buttonLabel}</Button>
            </div>
          )}
        </div>
      </div>
    </StructureContext.Provider>
  )
}
