import { useStructureFilters } from '../../../hooks/use_structure_filters'

import { LikeSwitch } from '../../molecules/LikeSwitch/LikeSwitch'

export const BrowseFilters: React.FC = function () {
  const [filters, changeFilter] = useStructureFilters()

  function handleChange(field: string) {
    return (value: any) => {
      changeFilter(field, value)
    }
  }

  return (
    <div className="px-12 mb-10 flex gap-6 items-center md:px-24">
      <label className="opacity-30">Filters:</label>
      <div className="flex gap-4 items-center">
        <LikeSwitch active={filters.favorites} onSwitch={handleChange('favorites')} />
      </div>
    </div>
  )
}
