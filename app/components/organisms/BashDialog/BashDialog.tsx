import React from 'react'
import configUtils from '../../../helpers/config_utils';
import { getStructureLink } from '../../../helpers/structure_utils';

import { StructureEntity } from '../../../pages/[username]/[slug]'
import { CopyButton } from '../../molecules/CopyButton/CopyButton';
import { StructureActionDialog } from '../../molecules/StructureActionDialog/StructureActionDialog'

export interface Props {
  structure: StructureEntity;
}

export const BashDialog: React.FC<Props> = function ({ structure }) {
  const url = configUtils.siteURL + `/api/create-structure/${structure.code}`
  const bashCommand = `curl -sSL ${url} | bash`

  return (
    <StructureActionDialog title="Clone Structure">
      <React.Fragment>
        <p>Create the structure into your local environment:</p>
        <textarea className="bg-black border border-solid border-white border-opacity-10 resize-none w-full outline-none p-4 rounded-md h-32" readOnly value={bashCommand} />
        <div className="flex justify-center">
          <CopyButton text={bashCommand} />
        </div>
      </React.Fragment>
    </StructureActionDialog>
  )
}
