import React from 'react'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioField: React.FC<Props> = function ({ label, ...props }) {
  return (
    <label className="flex gap-2 items-center">
      <input type="radio" {...props} />
      <span>{label}</span>
    </label>
  )
}
