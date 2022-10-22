import React from 'react'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CheckboxField: React.FC<Props> = function ({ label, ...props }) {
  return (
    <label className="flex gap-2 items-center">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
}
