import React from 'react'
import Link from 'next/link'
import { Icon } from '../../atoms/Icon/Icon'
import useCookieBanner from '../../../hooks/use_cookie_banner'
import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'

export interface Props {
  onClose: () => void;
}

export const CookieBanner: React.FC<Props> = function ({ onClose }) {
  const { visible, onAccept } = useCookieBanner()
  if (!visible) {
    return null
  }
  return (
    <div className="flex fixed bottom-12 right-12 bg-gradient-to-br from-purple-500 to-purple-900 px-8 py-6 rounded-3xl text-white items-center shadow-xl transition transform-gpu">
      <div className="mr-6">
        <div className="mb-2">
          We use cookies
        </div>
        <div className="flex items-center">
          <HoverUnderlined>
            <div onClick={onAccept} className="cursor-pointer text-2xl mr-2">ok!</div>
          </HoverUnderlined>
          <HoverUnderlined>
            <Link href="/privacy-policy">
              <a className="cursor-pointer text-sm">
                privacy policy
              </a>
            </Link>
          </HoverUnderlined>
        </div>
      </div>
      <div>
        <Icon name="cookie" svgClasses="w-14 h-14" />
      </div>
    </div>
  )
}
