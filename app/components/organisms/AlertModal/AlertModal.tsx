import React from 'react'

import { Alert } from '../../../contexts/site_context'

import { Button } from '../../molecules/Button/Button'

export interface Props {
  alert?: Alert;
  isLeaving?: boolean;
  onClose: () => void;
}

export const AlertModal: React.FC<Props> = function ({ alert, isLeaving, onClose }) {
  if (!alert) return null
  const animationClasses = !isLeaving
    ? 'animate-from-up md:animate-from-right'
    : 'animate-to-up md:animate-to-right'
  return (
    <div className={`${animationClasses} fixed z-50 top-0 left-0 right-0 h-1/2 bg-gradient-to-tr from-purple-700 to-purple-900 flex flex-col gap-8 justify-center items-center text-white text-2xl shadow-lg p-5 text-center origin-top-right md:p-8 md:text-4xl md:right-auto md:bottom-0 md:h-auto md:w-1/2 md:gap-10`}>
      <div>{alert.title}</div>
      {alert.description && (
        <div className="text-lg md:text-2xl">{alert.description}</div>
      )}
      <div>
        <Button bordered size="large" onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}
