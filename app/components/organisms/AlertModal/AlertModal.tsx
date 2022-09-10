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
  const alertTypeClasses = !alert.onConfirm
    ? 'from-purple-700 to-purple-900 h-1/2 md:h-auto md:w-1/2'
    : 'from-gray-900 to-red-900 h-full md:w-full md:h-auto'

  return (
    <div className={`${animationClasses} fixed z-50 top-0 left-0 right-0 bg-gradient-to-tr flex flex-col gap-8 justify-center items-center text-white text-2xl shadow-lg p-5 text-center origin-top-right overflow-hidden md:p-8 md:text-4xl md:right-auto md:bottom-0 md:gap-10 ${alertTypeClasses}`}>
      {alert.icon && (
        <div className="mb-2 text-5xl md:text-7xl">{alert.icon}</div>
      )}
      <div>{alert.title}</div>
      {alert.description && (
        <div className="text-lg md:text-2xl">{alert.description}</div>
      )}
      {alert.onConfirm && (
        <div className="flex justify-center items-center gap-2 md:gap-4">
          <Button filled size="large" onClick={alert.onConfirm}>Confirm</Button>
          <Button bordered size="large" onClick={alert.onCancel}>Cancel</Button>
        </div>
      )}
      {!alert.onConfirm && (
        <div>
          <Button bordered size="large" onClick={onClose}>Close</Button>
        </div>
      )}
    </div>
  )
}
