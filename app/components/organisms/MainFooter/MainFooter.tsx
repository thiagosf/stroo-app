import Link from 'next/link'

import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'

export const MainFooter: React.FC = function () {
  return (
    <div className="flex gap-2 relative z-10">
      <HoverUnderlined>
        <Link href="https://github.com/thiagosf/stroo-app" target="_blank" rel="noopener noreferrer">
          <a>Github</a>
        </Link>
      </HoverUnderlined>
      <span className="opacity-20">•</span>
      <HoverUnderlined>
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
      </HoverUnderlined>
    </div>
  )
}
