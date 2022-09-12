import React from 'react'
import Link from 'next/link'
import { Logo } from '../../molecules/Logo/Logo'
import { Button } from '../../molecules/Button/Button'
import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'

export interface Props { }

export const Landing: React.FC<Props> = function ({ }) {
  return (
    <div className="w-full flex flex-col p-12 relative">
      <div className="flex w-full justify-center items-center relative z-10">
        <Logo size="large" />
      </div>
      <div className="flex flex-grow justify-center items-center relative z-10">
        <div className="flex flex-col justify-between items-center flex-grow lg:px-40 lg:flex-row">
          <div className="my-10 text-center lg:mr-10 lg:my-0 lg:text-left">
            <h1 className="font-highlight text-4xl 2xl:text-6xl mb-2">Save software structures</h1>
            <p className="text-2xl lg:text-4xl text-gray-400">to share knowledge and best practices.</p>
            <p className="lg:text-lg text-green-500 mt-2"><span className="border-b border-dotted pb-1 border-green-500">It's totally free!</span></p>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/new">
              <Button as="a" bordered size="large">Create</Button>
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
      <div className="flex relative z-10">
        <HoverUnderlined>
          <Link href="/privacy-policy">
            <a>Privacy Policy</a>
          </Link>
        </HoverUnderlined>
      </div>
      <div className="pointer-events-none absolute z-0 top-0 left-0 right-0 bottom-0 p-10 bg-contain bg-no-repeat opacity-30 md:bg-center"></div>
    </div>
  )
}
