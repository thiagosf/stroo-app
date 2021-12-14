import React from 'react'
import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'
import { GitHubButton } from '../../molecules/GitHubButton/GitHubButton'

export interface Props {
  opened: boolean;
  onLogin: () => void;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = function ({ opened, onLogin, onClose }) {
  if (!opened) {
    return null
  }
  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 z-20 bg-black bg-opacity-70 justify-center items-center p-10">
      <div className="overflow-y-auto max-h-full rounded-lg p-10 bg-gray-900 text-white w-full shadow-lg md:w-2/4 lg:w-2/6">
        <h2 className="text-2xl mb-4 text-green-500 md:text-4xl md:mb-6">Login</h2>
        <p>Relax, it is only for auth purpose, we'll never sell your data 🤓</p>
        <div className="flex justify-center mt-4 lg:mt-6">
          <GitHubButton onClick={onLogin} />
        </div>
        <div className="flex justify-end mt-4 lg:mt-6">
          <HoverUnderlined>
            <div onClick={onClose}>
              Cancel
            </div>
          </HoverUnderlined>
        </div>
      </div>
    </div>
  )
}
