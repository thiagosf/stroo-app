import React, { useState } from 'react'
import { Theme } from '../../../contexts/site_context';
import configUtils from '../../../helpers/config_utils';
import { getStructureLink } from '../../../helpers/structure_utils';

import { StructureEntity } from '../../../pages/[username]/[slug]'
import { Button } from '../../molecules/Button/Button';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { RadioField } from '../../molecules/RadioField/RadioField';

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
  const [copyLabel, setCopyLabel] = useState('Copy')

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

  function handleCopy() {
    navigator.clipboard.writeText(embedTag)
    setCopyLabel(() => 'Copied!')
    setTimeout(() => setCopyLabel(() => 'Copy'), 3000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center border-b border-white border-opacity-10 pb-2">
        <h2 className="text-lg font-bold">Embed Structure</h2>
      </div>
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
        <Button bordered onClick={handleCopy}>{copyLabel}</Button>
      </div>
    </div>
  )
}
