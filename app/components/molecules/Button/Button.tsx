import React from 'react'

import { Icon } from '../../atoms/Icon/Icon'

import { ButtonColor, ButtonService, ButtonSize } from './ButtonService'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: string;
  spinner?: boolean;
  bordered?: boolean;
  filled?: boolean;
  size?: ButtonSize;
  children?: React.ReactNode;
  color?: ButtonColor;
}

export const Button: React.FC<Props> = React.forwardRef(function Button({ as, spinner, bordered, filled, size, children, className, color, ...props }, ref) {
  const Component: any = as ? as : 'button'
  const additionalClasses = []
  if (bordered) {
    additionalClasses.push('border-2 border-purple-500 hover:bg-purple-500')
  }
  if (filled) {
    additionalClasses.push(new ButtonService(color).classList())
  }
  if (size === 'large') {
    additionalClasses.push('text-lg py-4 px-8')
  } else if (size === 'small') {
    additionalClasses.push('text-xs py-1 px-3')
  } else {
    additionalClasses.push('py-2 px-4')
  }
  if (props.disabled) {
    additionalClasses.push('pointer-events-none opacity-50')
  }
  if (className) {
    additionalClasses.push(className)
  }
  return (
    <Component
      ref={ref}
      className={`cursor-pointer font-mono flex justify-center items-center font-bold rounded-full transform-gpu transition duration-200 hover:scale-105 outline-none ${additionalClasses.join(' ')}`}
      {...props}
    >
      {spinner && (
        <span className="animate-spin">
          <Icon name="spinner" svgClasses="w-4 h-4" />
        </span>
      )}
      {!spinner && children}
    </Component>
  )
})

