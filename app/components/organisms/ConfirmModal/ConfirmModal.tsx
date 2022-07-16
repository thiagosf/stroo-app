import React from 'react'

import { Button } from '../../molecules/Button/Button'

import { Modal } from '../Modal/Modal'

export interface Props {
  opened: boolean;
  title?: string;
  children: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<Props> = function ({
  opened,
  title = 'Confirmation',
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel
}) {
  return (
    <Modal opened={opened} title={title}>
      <>
        <div>{children}</div>
        <div className="flex justify-end gap-4 mt-4 lg:mt-6">
          <Button filled size="large" onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button bordered size="large" onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </>
    </Modal>
  )
}
