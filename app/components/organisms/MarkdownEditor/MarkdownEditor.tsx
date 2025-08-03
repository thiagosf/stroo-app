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
              EditorView.theme({
                '&': {
                  fontSize: '1.5rem',
                  fontFamily: '"Nanum Gothic Coding", monospace',
                  backgroundColor: 'transparent !important',
                  border: 'none !important',
                },
                '.cm-content': {
                  padding: '3rem',
                  lineHeight: '1.5',
                  minHeight: '100%',
                  backgroundColor: 'transparent !important',
                  color: '#ffffff !important',
                },
                '.cm-focused': {
                  outline: 'none !important',
                },
                '.cm-editor': {
                  height: '100%',
                  backgroundColor: 'transparent !important',
                },
                '.cm-scroller': {
                  height: '100%',
                  backgroundColor: 'transparent !important',
                },
                '.cm-gutters': {
                  backgroundColor: 'transparent !important',
                  border: 'none !important',
                  color: 'rgba(255, 255, 255, 0.3) !important',
                },
                '.cm-lineNumbers': {
                  color: 'rgba(255, 255, 255, 0.3) !important',
                },
                '.cm-activeLineGutter': {
                  backgroundColor: 'transparent !important',
                  color: '#a855f7 !important',
                },
                '.cm-activeLine': {
                  backgroundColor: 'rgba(168, 85, 247, 0.1) !important',
                },
                '.cm-selectionBackground': {
                  backgroundColor: 'rgba(168, 85, 247, 0.2) !important',
                },
                '.cm-cursor': {
                  borderLeftColor: '#ffffff !important',
                },
                // Markdown syntax highlighting - using correct CodeMirror classes
                '.cm-header': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-header.cm-header-1': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                  fontSize: '1.8rem !important',
                },
                '.cm-header.cm-header-2': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                  fontSize: '1.7rem !important',
                },
                '.cm-header.cm-header-3': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                  fontSize: '1.6rem !important',
                },
                // Markdown header marks (#, ##, ###, etc.)
                '.cm-formatting-header': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-formatting-header-1': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-formatting-header-2': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-formatting-header-3': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                // Header content
                // Alternative targeting for headers
                '.cm-meta': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-tag': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-strong': {
                  color: '#f1fa8c !important',
                  fontWeight: 'bold !important',
                },
                '.cm-em': {
                  color: '#f1fa8c !important',
                  fontStyle: 'italic !important',
                },
                '.cm-monospace': {
                  color: '#50fa7b !important',
                  backgroundColor: 'rgba(68, 71, 90, 0.5) !important',
                  padding: '0.1em 0.3em !important',
                  borderRadius: '0.3em !important',
                },
                '.cm-url': {
                  color: '#8be9fd !important',
                },
                '.cm-link': {
                  color: '#8be9fd !important',
                },
                '.cm-list': {
                  color: '#ff79c6 !important',
                },
                '.cm-quote': {
                  color: '#6272a4 !important',
                  fontStyle: 'italic !important',
                },
                // Additional markdown token styles
                '.cm-atom': {
                  color: '#bd93f9 !important',
                },
                '.cm-def': {
                  color: '#50fa7b !important',
                },
                '.cm-variable': {
                  color: '#f8f8f2 !important',
                },
                '.cm-variable-2': {
                  color: '#61dafb !important',
                  fontWeight: 'bold !important',
                },
                '.cm-string': {
                  color: '#f1fa8c !important',
                },
                '.cm-comment': {
                  color: '#6272a4 !important',
                  fontStyle: 'italic !important',
                },
              }),
              EditorView.updateListener.of(handleCursorChange),
              EditorView.lineWrapping,
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
