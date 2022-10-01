import React from 'react'
import Link from 'next/link'
import { Logo } from '../../molecules/Logo/Logo'
import { Button } from '../../molecules/Button/Button'
import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'

export interface Props { }

export const Landing: React.FC<Props> = function ({ }) {
  return (
    <div className="w-full flex flex-col relative">
      <div className="flex w-full justify-center items-center relative z-10">
        <Logo size="large" />
      </div>
      <div className="flex flex-grow justify-center items-center relative z-10">
        <div className="flex flex-col justify-between items-center flex-grow lg:px-40 lg:flex-row">
          <div className="my-10 text-center lg:mr-10 lg:my-0 lg:text-left">
            <h1 className="font-highlight text-4xl 2xl:text-6xl mb-2">Publish software structures</h1>
            <p className="font-mono text-2xl 2xl:text-4xl text-gray-400">to share knowledge and best practices.</p>
            <p className="font-mono 2xl:text-lg text-green-500 mt-2"><span className="border-b border-dotted pb-1 border-green-500">It&apos;s totally free!</span></p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Link href="/new" passHref>
              <Button as="a" bordered size="large">CREATE</Button>
            </Link>
            <div className="mt-4"></div>
            <HoverUnderlined>
              <Link href="/browse">
                <a>Or browse saved structures</a>
              </Link>
            </HoverUnderlined>
          </div>
        </div>
      </div>
    </div>
  )
}
