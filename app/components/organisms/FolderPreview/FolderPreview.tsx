import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  const [submitted, setSubmitted] = useState(false)
  const [folderData, setFolderData] = useState(parse(entity.content))
  const [formData, setFormData] = useState<StructureEntity>({
    name: entity.name,
    type: entity.type,
    content: entity.content,
    user: {
      name: 'Fulano',
      username: 'fulano',
      avatar: 'https://avatars.githubusercontent.com/u/319234?v=4'
    }
  })
  const [mode, setMode] = useState<Mode>(startMode ?? Mode.PREVIEW)

  const [createStructure] = useMutation(CREATE_STRUCTURE)

  const handleChangeEditor = (value: string) => {
    setFormData((d) => ({ ...d, content: value }))
    setFolderData(parse(value ?? ''))
  }

  const handleChangeInput = (field: string) => {
    return (e: any) => {
      let value = e.target.value.trim().toLowerCase()
      if (e.target.value[e.target.value.length - 1] === ' ') {
        value += '-'
      }
      value = value.replace(/[^0-9a-z-]/ig, '')
      setFormData((values) => ({
        ...values,
        [field]: value
      }))
    }
  }

  const handleFocus = useCallback((path: string) => {
    structureValues.dispatch('currentPath', path.split(FOLDER_SEPARATOR))
    structureValues.dispatch('clickFrom', 'title')
  }, [])

  const changeMode = (newMode: Mode) => {
    return () => {
      setMode(newMode)
    }
  }

  const onMountElements = useCallback((pathsTopPositions: PathTopPosition[]) => {
    structureValues.dispatch('pathsTopPositions', pathsTopPositions)
  }, [])

  const handlePublish = (userContextValue: UserContextProps) => {
    return async () => {
      if (submitted) return
      const { currentUser, openModal } = userContextValue

      if (currentUser) {
        setSubmitted(() => true)
        try {
          await createStructure({
            variables: {
              type: formData.type,
              name: formData.name,
              content: formData.content
            },
            onCompleted(data) {
              setSubmitted(() => false)
              if (data) {
                router.push(getStructureLink(data.createStructure))
              } else {
                // @todo show errors
              }
            }
          })
        } catch (error) {
          console.log('error', error)
          setSubmitted(() => false)
        }
      } else {
        openModal()
      }
    }
  }

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

  return (
    <UserContext.Consumer>
      {(userContextValue) => (
        <StructureContext.Provider value={structureValues}>
          <div className="flex flex-col flex-grow lg:flex-row">
            <div className="flex flex-1 bg-gradient-to-tl from-red-700 to-purple-800 justify-end">
              <div className="p-12 flex-grow h-full flex flex-col max-w-4xl">
                <div className="flex-shrink-0">
                  <StructureInfo
                    entity={entity}
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
                      disabled={mode === Mode.PREVIEW}
                      onClick={changeMode(Mode.PREVIEW)}
                    >preview</Button>
                  </div>
                  <div className="">
                    <Button
                      bordered
                      disabled={mode === Mode.EDITOR}
                      onClick={changeMode(Mode.EDITOR)}
                    >editor</Button>
                  </div>
                </div>
                <div className="">
                  <Logo />
                </div>
              </div>
              <div className="flex-grow overflow-x-auto" ref={markdowWrapperRef}>
                {mode === Mode.PREVIEW && (
                  <div className="max-w-4xl">
                    <MarkdownPreview
                      value={formData.content}
                      onTitleClick={handleFocus}
                      onMountElements={onMountElements}
                    />
                  </div>
                )}
                {mode === Mode.EDITOR && (
                  <MarkdownEditor
                    initialValue={formData.content}
                    onChange={handleChangeEditor}
                    onFocus={handleFocus}
                  />
                )}
              </div>
              {mode === Mode.EDITOR && (
                <div className="flex flex-col px-12 py-6 border-t border-white border-opacity-10 bg-black bg-opacity-30 2xl:flex-row 2xl:justify-between 2xl:items-center">
                  <div className="flex flex-col flex-grow mb-8 2xl:mb-0 lg:mr-10 lg:flex-row">
                    <div className="flex-shrink-0 flex-grow mb-8 lg:mb-0 lg:mr-2">
                      <FormControl
                        label="name"
                        value={formData.name}
                        onChange={handleChangeInput('name')}
                      />
                    </div>
                    <div className="flex-shrink-0 flex-grow lg:ml-2">
                      <FormControl
                        label="type (react, vue, kotlin, etc)"
                        value={formData.type}
                        onChange={handleChangeInput('type')}
                      />
                    </div>
                  </div>
                  <Button
                    filled
                    size="large"
                    spinner={submitted}
                    onClick={handlePublish(userContextValue)}
                  >Publish</Button>
                </div>
              )}
            </div>
          </div>
        </StructureContext.Provider>
      )}
    </UserContext.Consumer>
  )
}
