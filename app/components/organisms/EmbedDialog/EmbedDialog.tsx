import React, { useState } from 'react'

import { Theme } from '../../../contexts/site_context'
import configUtils from '../../../helpers/config_utils'
import { getStructureLink } from '../../../helpers/structure_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'

import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField'
import { CopyButton } from '../../molecules/CopyButton/CopyButton'
import { RadioField } from '../../molecules/RadioField/RadioField'
import { StructureActionDialog } from '../../molecules/StructureActionDialog/StructureActionDialog'

export interface EmbedParams {
  theme: Theme;
  hide_header: boolean;
}

export interface Props {
  structure: StructureEntity;
}

export const EmbedDialod: React.FC<Props> = function ({ structure }) {
  const url = configUtils.siteURL + getStructureLink(structure)
  const [params, setParams] = useState<EmbedParams>({
    theme: 'dark',
    hide_header: false
  })
  const [embedTag, setEmbedTag] = useState(buildEmbedTag(params))

  function buildEmbedTag(params: EmbedParams) {
    const queryString = Object.keys(params).map(key => {
      return `${key}=${params[key]}`
    }).join('&')
    return `<iframe src="${url}?${queryString}" width="100%" height="500" frameborder="0"></iframe>`
  }

  function handleChange(field: keyof EmbedParams) {
    return (e: any) => {
      let value: any
      if (field === 'theme') value = e.target.value
      else if (field === 'hide_header') value = e.target.checked

      const newParams = { ...params, [field]: value }
      setParams(() => newParams)
      setEmbedTag(() => buildEmbedTag(newParams))
    }
  }

  return (
    <StructureActionDialog title="Embed Structure">
      <React.Fragment>
        <div className="flex items-center gap-4">
          <p>Theme:</p>
          <RadioField
            label="Dark"
            name="theme"
            value="dark"
            checked={params.theme === 'dark'}
            onChange={handleChange('theme')}
          />
          <RadioField
            label="Light"
            name="theme"
            value="light"
            checked={params.theme === 'light'}
            onChange={handleChange('theme')}
          />
        </div>
        <CheckboxField
          label="Hide header"
          name="hide_header"
          onChange={handleChange('hide_header')}
        />
        <textarea className="bg-black border border-solid border-white border-opacity-10 resize-none w-full outline-none p-4 rounded-md h-32" readOnly value={embedTag} />
        <div className="flex justify-center">
          <CopyButton text={embedTag} />
        </div>
      </React.Fragment>
    </StructureActionDialog>
  )
}
