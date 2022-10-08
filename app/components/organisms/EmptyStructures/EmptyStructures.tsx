import Link from 'next/link'

import { Button } from '../../molecules/Button/Button'

export const EmptyStructures: React.FC = function () {
  return (
    <div className="flex flex-col justify-center items-center gap-8 text-center lg:gap-16">
      <div className="text-3xl lg:text-5xl">You have no structure yet!</div>
      <div>
        <Link href="/">
          <Button bordered size="large">Create my first!</Button>
        </Link>
      </div>
    </div>
  )
}
