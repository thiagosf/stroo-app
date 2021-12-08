import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PathTopPosition, StructureContext, StructureContextProps } from '../../../contexts/structure_context'
import { FOLDER_SEPARATOR, parse } from '../../../helpers/folder_utils'
import { StructreEntity } from '../../../pages'
import { Icon } from '../../atoms/Icon/Icon'
import { Button } from '../../molecules/Button/Button'
import { FormControl } from '../../molecules/FormControl/FormControl'
import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor'
import { MarkdownPreview } from '../MarkdownPreview/MarkdownPreview'
import { Structure } from '../Structure/Structure'
import { StructureInfo } from '../StructureInfo/StructureInfo'

export interface Props {
  entity: StructreEntity;
}

export enum Mode {
  PREVIEW = 'preview',
  EDITOR = 'editor'
}

export const FolderPreview: React.FC<Props> = function ({ entity }) {
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

  const [folderData, setFolderData] = useState(parse(entity.structure))
  const [formData, setFormData] = useState({
    name: entity.name,
    type: entity.type,
  })
  const [mode, setMode] = useState<Mode>(Mode.PREVIEW)

  const handleChangeEditor = (value: string) => {
    setFolderData(parse(value ?? ''))
  }

  const handleChangeInput = (field: string) => {
    return (e: any) => {
      let value = e.target.value.trim().toLowerCase()
      if (e.target.value[e.target.value.length - 1] === ' ') {
        value += '-'
      }
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
    <StructureContext.Provider value={structureValues}>
      <div className="flex flex-col flex-grow text-white md:flex-row">
        <div className="flex-1 bg-gradient-to-tl from-red-700 to-purple-800">
          <div className="p-12 flex-grow h-full flex flex-col">
            <div className="flex-shrink-0">
              <StructureInfo entity={entity} />
            </div>
            <div className="flex-grow mt-8 relative">
              <Structure
                data={folderData}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-900 flex flex-col">
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
              <Icon name="logo" svgClasses="w-12 h-6" />
            </div>
          </div>
          <div className="flex-grow overflow-x-auto" ref={markdowWrapperRef}>
            {mode === Mode.PREVIEW && (
              <MarkdownPreview
                value={entity.structure}
                onTitleClick={handleFocus}
                onMountElements={onMountElements}
              />
            )}
            {mode === Mode.EDITOR && (
              <MarkdownEditor
                initialValue={entity.structure}
                onChange={handleChangeEditor}
                onFocus={handleFocus}
              />
            )}
          </div>
          {mode === Mode.EDITOR && (
            <div className="flex px-12 py-6 justify-between items-center border-t border-white border-opacity-10">
              <div className="flex flex-grow mr-10">
                <div className="flex-shrink-0 flex-grow mr-2">
                  <FormControl
                    label="name"
                    value={formData.name}
                    onChange={handleChangeInput('name')}
                  />
                </div>
                <div className="flex-shrink-0 flex-grow ml-2">
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
              >Publish</Button>
            </div>
          )}
        </div>
      </div>
    </StructureContext.Provider>
  )
}
