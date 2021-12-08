import React from 'react'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  onClose: () => void;
}

export const CookieBanner: React.FC<Props> = function ({ onClose }) {
  return (
    <div className="flex fixed bottom-12 right-12 bg-gradient-to-br from-purple-500 to-purple-900 px-8 py-6 rounded-3xl text-white items-center shadow-xl transition transform-gpu">
      <div className="mr-6">
        <div className="mb-2">
          We use cookies
        </div>
        <div className="flex items-center">
          <div className="cursor-pointer text-2xl mr-2 hover:underline">ok!</div>
          <div className="cursor-pointer text-sm hover:underline">why?</div>
        </div>
      </div>
      <div>
        <Icon name="cookie" svgClasses="w-14 h-14" />
      </div>
    </div>
  )
}
