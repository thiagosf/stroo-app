import { Spinner } from '../../atoms/Spinner/Spinner'

import { NotFound } from '../NotFound/NotFound'

export interface Props {
  loading: boolean;
  notFound: boolean;
  children: React.ReactNode;
}

export const CustomSuspense: React.FC<Props> = function ({ loading, notFound, children }) {
  const showFallback = loading || notFound
  const isValid = !loading && !notFound

  return (
    <>
      {showFallback && (
        <div className="flex justify-center items-center grow">
          {loading && (
            <div className="flex justify-center items-center grow">
              <Spinner />
            </div>
          )}
          {!loading && notFound && (
            <div className="flex justify-center items-center grow">
              <NotFound />
            </div>
          )}
        </div>
      )}
      {isValid && children}
    </>
  )
}
