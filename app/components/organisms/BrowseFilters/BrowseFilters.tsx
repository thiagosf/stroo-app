import { useContext, useState } from 'react'

import { UserContext } from '../../../contexts/user_context'
import { useStructureFilters } from '../../../hooks/use_structure_filters'
import { Icon } from '../../atoms/Icon/Icon'
import { DashedInput } from '../../molecules/DashedInput/DashedInput'

import { LikeSwitch } from '../../molecules/LikeSwitch/LikeSwitch'

export const BrowseFilters: React.FC = function () {
  const userContextValue = useContext(UserContext)
  const [filters, changeFilter] = useStructureFilters()
  const [opened, setOpened] = useState(false)
  const filtersBoxClasses = opened ? 'flex' : 'hidden md:flex'
  const icon = opened ? 'arrow-up' : 'arrow-down'

  function handleChange(field: string) {
    return (value: string | boolean) => {
      changeFilter(field, value)
    }
  }

  function toggleFilters() {
    setOpened(opened => !opened)
  }

  return (
    <div className="px-12 mb-10 flex flex-col gap-6 items-center md:px-24 md:flex-row">
      <label className="opacity-30 flex gap-1 items-center md:gap-0" onClick={toggleFilters}>Filters<span className="hidden md:inline">:</span><Icon name={icon} svgClasses="w-6 h-6 md:hidden" /></label>
      <div className={`flex-col gap-4 items-center rounded-lg md:flex-row 2xl:p-6 2xl:bg-gray-900 ${filtersBoxClasses}`}>
        <DashedInput
          label="search"
          value={filters.search}
          onChange={handleChange('search')}
        />
        <DashedInput
          label="type"
          value={filters.type}
          onChange={handleChange('type')}
        />
        {userContextValue.currentUser && (
          <LikeSwitch active={filters.favorites} onSwitch={handleChange('favorites')} />
        )}
      </div>
    </div>
  )
}
