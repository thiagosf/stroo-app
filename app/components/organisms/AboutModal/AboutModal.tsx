import Link from 'next/link';
import React, { useContext } from 'react'
import { SiteContext } from '../../../contexts/site_context';
import { Button } from '../../molecules/Button/Button';
import { Modal } from '../Modal/Modal';

export interface Props {
  opened: boolean;
}

export const AboutModal: React.FC<Props> = function ({ opened }) {
  const { setIsShowingAbout } = useContext(SiteContext)

  function closeModal() {
    setIsShowingAbout(false)
  }

  return (
    <Modal opened={opened} title="About">
      <div className="mb-4 md:mb-8">
        <p className="text-2xl mb-2 md:mb-6">Stroo is a web app to publish and share software structures.</p>
        <p className="text-gray-500">It&apos;s totally free and open sourced! Check our <Link href="https://github.com/thiagosf/stroo-app/"><a target="_blank" rel="noopener noreferrer" className="underline">GitHub Repository</a></Link> out!</p>
      </div>
      <Button bordered onClick={closeModal}>Close</Button>
    </Modal>
  )
}
