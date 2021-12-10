import React from 'react'
import Link from 'next/link'
import { Logo } from '../../molecules/Logo/Logo'
import { Button } from '../../molecules/Button/Button'
import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {}

export const Landing: React.FC<Props> = function ({  }) {
  return (
    <div className="w-full flex flex-col p-12 relative">
      <div className="flex w-full justify-center items-center">
        <Logo size="large" />
      </div>
      <div className="flex flex-grow justify-center items-center">
        <div className="flex flex-col justify-between items-center flex-grow lg:px-40 lg:flex-row">
          <div className="my-10 text-center lg:mr-10 lg:my-0 lg:text-left">
            <h1 className="text-4xl 2xl:text-6xl mb-2">Build project structures</h1>
            <p className="text-2xl 2xl:text-4xl opacity-50">to share knowledge and best practices</p>
          </div>
          <div>
            <Link href="/new">
              <Button as="a" bordered size="large">Create</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex">
        <HoverUnderlined>
          <Link href="/privacy-policy">
            <a>Privacy Policy</a>
          </Link>
        </HoverUnderlined>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 p-10">
        <Icon name="landing-draw" svgClasses="w-full h-full" />
      </div>
    </div>
  )
}
