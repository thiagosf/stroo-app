import React from 'react'

import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'
import { GitHubButton } from '../../molecules/GitHubButton/GitHubButton'

import { Modal } from '../Modal/Modal'

export interface Props {
  opened: boolean;
  loading: boolean;
  onLogin: () => void;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = function ({ opened, loading, onLogin, onClose }) {
  return (
    <Modal opened={opened} title="Login">
      <>
        <p>Relax, it is only for auth purpose, we'll never use your data 🤓</p>
        <div className="flex justify-center mt-4 lg:mt-6">
          <GitHubButton loading={loading} onClick={onLogin} />
        </div>
        <div className="flex justify-end mt-4 lg:mt-6">
          <HoverUnderlined>
            <div onClick={onClose}>
              Cancel
            </div>
          </HoverUnderlined>
        </div>
      </>
    </Modal>
  )
}
