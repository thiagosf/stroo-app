import React from 'react'

import { FormControl } from '../../molecules/FormControl/FormControl'

export interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const DashedInput: React.FC<Props> = function ({ label, value, onChange }) {
  function handleChangeInput(e: any) {
    let value = typeof e === 'string' ? e : e.target.value
    value = value.toLowerCase()
    if (value[value.length - 1] === ' ') {
      value += '-'
    }
    value = value.replace(/[^0-9a-z-]/g, '').trim()
    value = value.replace(/--+/g, '-')
    onChange(value)
  }

  return (
    <FormControl
      label={label}
      value={value}
      onChange={handleChangeInput}
    />
  )
}
