import { Spinner } from '../../atoms/Spinner/Spinner'

export const FullSpinner: React.FC = function () {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-opacity-90 flex justify-center items-center">
      <Spinner />
    </div>
  )
}
