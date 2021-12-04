import React from 'react'

export interface Props {
  label: string;
  value: string;
  onChange: (e: any) => void;
}

export const FormControl: React.FC<Props> = function ({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={label}
        className="opacity-50 text-sm"
      >{label}</label>
      <input
        id={label}
        type="text"
        value={value}
        onChange={onChange}
        className="bg-transparent border-0 border-b-2 border-gray-500 outline-none font-bold text-lg py-2 focus:border-purple-500 transition duration-200"
      />
    </div>
  )
}
