import React from 'react'

import { HoverUnderlined } from '../../atoms/HoverUnderlined/HoverUnderlined'
import { GitHubButton } from '../../molecules/GitHubButton/GitHubButton'
import { TwitterButton } from '../../molecules/TwitterButton/TwitterButton';

import { Modal } from '../Modal/Modal'

export type AuthService = 'github' | 'twitter'

export interface Props {
  opened: boolean;
  loading: boolean;
  onLogin: (provider: AuthService) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = function ({ opened, loading, onLogin, onClose }) {
  return (
    <Modal opened={opened} title="Login">
      <>
        <p>Relax, it is only for auth purpose, we&apos;ll never use your data 🤓</p>
        <div className="flex flex-col justify-center mt-4 gap-4 lg:mt-6">
          <GitHubButton loading={loading} onClick={() => onLogin('github')} />
          <TwitterButton loading={loading} onClick={() => onLogin('twitter')} />
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
