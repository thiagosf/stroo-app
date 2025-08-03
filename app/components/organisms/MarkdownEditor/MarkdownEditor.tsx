import React, { useState, useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'

import { convertTreeToMarkdown, isTreeFormatType } from '../../../helpers/folder_utils'
import { Button } from '../../molecules/Button/Button'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

export interface Props {
  initialValue: string;
  onChange: (value: string) => void;
  onFocus: (path: string) => void;
}

const ALERT_VALUE_BYTES = 1024 * 1024

export const MarkdownEditor: React.FC<Props> = function ({ initialValue, onChange, onFocus }) {
  const [value, setValue] = useState(initialValue)
  const [tempValue, setTempValue] = useState('')
  const [lines, setLines] = useState(initialValue.split("\n"))
  const showConvertButton = isTreeFormatType(value)

  const handleChange = useCallback((val: string) => {
    if (tempValue) return
    setNewValue(val)
  }, [tempValue])

  const setNewValue = useCallback((value: string) => {
    setValue(value)
    onChange(value)
    setLines(value.split("\n"))
  }, [onChange])

  const getLineValue = useCallback((lineNumber: number): string => {
    return (lines[lineNumber] ?? '').toString()
  }, [lines])

  const focusLineValue = useCallback((lineValue: string): void => {
    const path = lineValue.split('## ')
      .slice(1)
      .join('## ')
    onFocus(path)
  }, [onFocus])

  const onConfirmLargeValue = () => {
    setNewValue(tempValue)
    setTempValue('')
  }

  const onCancelLargeValue = () => {
    setTempValue('')
  }

  const handleConvertTreeToMarkdown = () => {
    setNewValue(convertTreeToMarkdown(value))
  }

  return (
    <div className="flex flex-col h-full">
      <ConfirmModal
        opened={!!tempValue}
        onConfirm={onConfirmLargeValue}
        onCancel={onCancelLargeValue}
      >
        <p>You are trying to paste a large text. Possibly it will let slow the app. Are you sure you want to continue?</p>
      </ConfirmModal>
      <div className="flex h-full">
        <div className="w-full h-full">
          <CodeMirror
            value={value}
            onChange={handleChange}
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
            ]}
            theme="dark"
          />
        </div>
      </div>
      {showConvertButton && (
        <div className="flex justify-center py-6">
          <Button
            filled
            size="large"
            onClick={handleConvertTreeToMarkdown}
          >Convert tree to markdown</Button>
        </div>
      )}
    </div>
  )
}
