import React, { useState, useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'

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
  const [lastPosition, setLastPosition] = useState(0)
  const [lines, setLines] = useState(initialValue.split("\n"))
  const showConvertButton = isTreeFormatType(value)

  const handleChange = useCallback((val: string) => {
    if (tempValue) return
    setNewValue(val)
  }, [tempValue])

  const handleBeforeInput = useCallback((e: any) => {
    const { data } = e
    const bytes = new TextEncoder().encode(data).length
    if (bytes >= ALERT_VALUE_BYTES) {
      setTempValue(data)
      e.preventDefault()
    }
  }, [])

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

  // Function to handle cursor position changes in CodeMirror
  const handleCursorChange = useCallback((viewUpdate: any) => {
    if (viewUpdate.state) {
      const pos = viewUpdate.state.selection.main.head
      if (pos === lastPosition) return

      setLastPosition(() => pos)
      const text = viewUpdate.state.doc.toString()

      const lineNumber = text.substring(0, pos).split("\n").length

      let currentLine = lineNumber - 1
      while (currentLine >= 0) {
        const lineValue = getLineValue(currentLine)
        if (lineValue.startsWith('##')) {
          focusLineValue(lineValue)
          break
        }
        --currentLine
      }
    }
  }, [lastPosition, getLineValue, focusLineValue]);

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
            onBeforeInput={handleBeforeInput}
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
              EditorView.updateListener.of(handleCursorChange),
            ]}
            height="100%"
            style={{ height: '100%' }}
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
