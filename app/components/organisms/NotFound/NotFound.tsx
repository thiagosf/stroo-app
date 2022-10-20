import React from 'react'
import Link from 'next/link'

export interface Props {
  title?: string;
  hideNavigation?: boolean;
}

export const NotFound: React.FC<Props> = function ({ title, hideNavigation }) {
  return (
    <div className="font-mono text-center min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">{title ? title : 'Not found'}</h1>
      {!hideNavigation && (
        <p className="text-2xl mt-5">Back to <Link href="/"><a className="text-custom-orange underline">home</a></Link></p>
      )}
    </div>
  )
}
