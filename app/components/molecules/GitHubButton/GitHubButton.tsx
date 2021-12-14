import React from 'react'
import { Icon } from '../../atoms/Icon/Icon'
import { Button } from '../Button/Button'

export interface Props {
  onClick: () => void;
}

export const GitHubButton: React.FC<Props> = function ({ onClick }) {
  return (
    <Button bordered size="large" onClick={onClick}>
      <div>
        Login with GitHub
      </div>
      <Icon name="github" svgClasses="w-10 h-10 ml-4" />
    </Button>
  )
}
