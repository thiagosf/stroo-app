import React, { ButtonHTMLAttributes } from 'react'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  spinner?: boolean;
  bordered?: boolean;
  filled?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<Props> = function ({ spinner, bordered, filled, children, className, ...props }) {
  const additionalClasses = []
  if (bordered) {
    additionalClasses.push('border-2 border-custom-orange hover:bg-custom-orange')
  }
  if (filled) {
    additionalClasses.push('bg-custom-orange')
  }
  if (props.disabled) {
    additionalClasses.push('pointer-events-none opacity-50')
  }
  if (className) {
    additionalClasses.push(className)
  }
  return (
    <button
      className={`cursor-pointer flex justify-center items-center py-2 px-5 md:py-4 md:px-8 uppercase text-xs font-bold rounded-full transform-gpu transition duration-300 hover:scale-105 ${additionalClasses.join(' ')}`}
      {...props}
    >
      {spinner && (
        <span className="animate-spin">
          <Icon name="spinner" svgClasses="w-4 h-4" />
        </span>
      )}
      {!spinner && children}
    </button>
  )
}
