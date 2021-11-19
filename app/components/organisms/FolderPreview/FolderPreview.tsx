import React, { useState } from 'react'
import { parse } from '../../../helpers/folder_utils'
import { StructreEntity } from '../../../pages'
import { Button } from '../../molecules/Button/Button'
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
  const [folderData, setFolderData] = useState(parse(entity.structure))
  const [mode, setMode] = useState<Mode>(Mode.PREVIEW)

  const handleChange = (value: string) => {
    setFolderData(parse(value ?? ''))
  }

  const changeMode = (newMode: Mode) => {
    return () => {
      setMode(newMode)
    }
  }

  return (
    <div className="flex flex-grow text-white">
      <div className="flex-1 bg-gradient-to-tl from-purple-700 to-purple-900">
        <div className="p-12 flex-grow h-full flex flex-col">
          <div className="flex-shrink-0">
            <StructureInfo entity={entity} />
          </div>
          <div className="flex-grow mt-8 relative">
            <Structure data={folderData} />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-900 flex flex-col">
        <div className="flex px-12 py-6">
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
        <div className="flex-grow overflow-x-auto">
          {mode === Mode.PREVIEW && (
            <MarkdownPreview value={entity.structure} />
          )}
          {mode === Mode.EDITOR && (
            <MarkdownEditor initialValue={entity.structure} onChange={handleChange} />
          )}
        </div>
        {mode === Mode.EDITOR && (
          <div className="flex px-12 py-6 justify-center">
            <Button
              filled
              size="large"
            >Save</Button>
          </div>
        )}
      </div>
    </div>
  )
}
