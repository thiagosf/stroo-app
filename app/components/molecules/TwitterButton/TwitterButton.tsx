import React from 'react'
import { Icon } from '../../atoms/Icon/Icon'
import { Button } from '../Button/Button'

export interface Props {
  loading: boolean;
  onClick: () => void;
}

export const TwitterButton: React.FC<Props> = function ({ loading, onClick }) {
  return (
    <Button color="light-blue" filled size="large" onClick={onClick} spinner={loading} disabled={loading}>
      <div>
        Login with Twitter
      </div>
      <Icon name="twitter" svgClasses="w-10 h-10 ml-4" />
    </Button>
  )
}
