import React from 'react'

import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  icon: string;
  onClick: () => void;
  active?: boolean;
}

export const StructureActionButton: React.FC<Props> = function ({ icon, onClick, active }) {
  const activeClasses = active
    ? 'bg-purple-500 hover:bg-opacity-90'
    : 'bg-white bg-opacity-5 hover:bg-opacity-10'

  return (
    <div className={`cursor-pointer w-8 h-8  flex justify-center items-center p-2 rounded-full transition duration-200 ${activeClasses}`} onClick={onClick}>
      <Icon name={icon} svgClasses="w-full h-full" />
    </div>
  )
}
