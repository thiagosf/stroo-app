import { useState } from 'react'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  active: boolean;
  onSwitch: (value: boolean) => void;
}

export const LikeSwitch: React.FC<Props> = function ({ active, onSwitch }) {
  const [value, setValue] = useState(active)
  const activeClasses = active ? 'bg-purple-500' : 'bg-purple-800'
  const iconClasses = active ? 'translate-x-6' : 'opacity-50'

  function handleSwitch() {
    setValue(() => !value)
    onSwitch(!value)
  }

  return (
    <div className={`flex transition-colors duration-300 cursor-pointer rounded-full p-1 w-16 select-none ${activeClasses}`} onClick={handleSwitch}>
      <Icon name="heart-filled" svgClasses={`relative w-8 h-8 bg-gray-800 bg-opacity-90 rounded-full p-1 transition-all duration-300 ${iconClasses}`} />
    </div>
  )
}
