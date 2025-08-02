import React, { useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'

import { convertTreeToMarkdown, isTreeFormatType } from '../../../helpers/folder_utils'
import { Button } from '../../molecules/Button/Button'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

// Dynamic import to avoid SSR issues with CodeMirror
const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror'),
  {
    ssr: false,
    loading: () => (
      <div className="font-mono bg-transparent border-0 resize-none w-full h-full text-2xl outline-none p-12 flex items-center justify-center">
        <div className="text-gray-400">Loading editor...</div>
      </div>
    )
  }
)

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

  const handleBeforeInput = useCallback((e: any) => {
    const { data } = e
    const bytes = new TextEncoder().encode(data).length
    if (bytes >= ALERT_VALUE_BYTES) {
      setTempValue(data)
      e.preventDefault()
    }
  }, [])

  const handleChange = useCallback((val: string) => {
    if (tempValue) return
    setNewValue(val)
  }, [tempValue])

  const setNewValue = useCallback((value: string) => {
    setValue(value)
    onChange(value)
    setLines(value.split("\n"))
  }, [onChange])

  const handleEditorClick = useCallback((e: React.MouseEvent) => {
    // This will be handled by CodeMirror's selection change
  }, [])

  const getLineValue = useCallback((lineNumber: number): string => {
    return (lines[lineNumber] ?? '').toString()
  }, [lines])

  const focusLineValue = useCallback((lineValue: string): void => {
    const path = lineValue.split('## ')
      .slice(1)
      .join('## ')
    onFocus(path)
  }, [onFocus])

  // Function to handle cursor position changes in CodeMirror
  const handleCursorChange = useCallback((viewUpdate: any) => {
    if (viewUpdate.state) {
      const pos = viewUpdate.state.selection.main.head
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
  }, [getLineValue, focusLineValue])

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

  // CodeMirror extensions and theme
  const extensions = useMemo(() => {
    const loadExtensions = async () => {
      const { markdown } = await import('@codemirror/lang-markdown')
      const { oneDark } = await import('@codemirror/theme-one-dark')
      const { EditorView } = await import('@codemirror/view')

      return [
        markdown(),
        oneDark,
        EditorView.theme({
          '&': {
            fontSize: '1.5rem',
            fontFamily: '"Nanum Gothic Coding", monospace',
          },
          '.cm-content': {
            padding: '3rem',
            lineHeight: '1.5',
            minHeight: '100%',
          },
          '.cm-focused': {
            outline: 'none',
          },
          '.cm-editor': {
            height: '100%',
          },
          '.cm-scroller': {
            height: '100%',
          },
        }),
        EditorView.updateListener.of(handleCursorChange),
      ]
    }

    return loadExtensions()
  }, [handleCursorChange])

  const [loadedExtensions, setLoadedExtensions] = useState<any[]>([])

  // Load extensions asynchronously
  React.useEffect(() => {
    extensions.then(ext => setLoadedExtensions(ext))
  }, [extensions])

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
            extensions={loadedExtensions}
            height="100%"
            style={{ height: '100%' }}
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
