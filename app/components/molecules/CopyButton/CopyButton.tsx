import React, { useState } from 'react'

import { copyToClipboard } from '../../../helpers/clipboard_utils'

import { Button } from '../Button/Button'

export interface Props {
  text: string;
}

export const CopyButton: React.FC<Props> = function ({ text }) {
  const [copyLabel, setCopyLabel] = useState('Copy')

  function handleCopy() {
    copyToClipboard(text)
    setCopyLabel(() => 'Copied!')
    setTimeout(() => setCopyLabel(() => 'Copy'), 3000)
  }

  return (
    <Button bordered onClick={handleCopy}>{copyLabel}</Button>
  )
}
