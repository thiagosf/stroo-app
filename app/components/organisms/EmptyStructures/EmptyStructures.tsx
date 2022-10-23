import Link from 'next/link'

import { Button } from '../../molecules/Button/Button'

export interface Props {
  isLoggedUserProfile: boolean;
}

export const EmptyStructures: React.FC<Props> = function ({ isLoggedUserProfile }) {
  const sentence = isLoggedUserProfile
    ? 'You have no structure yet!'
    : 'No structure created yet'

  return (
    <div className="font-mono flex flex-col justify-center items-center gap-8 text-center lg:gap-16">
      <div className="text-3xl lg:text-5xl">{sentence}</div>
      {isLoggedUserProfile && (
        <div>
          <Link href="/">
            <a>
              <Button bordered size="large">Create my first!</Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
