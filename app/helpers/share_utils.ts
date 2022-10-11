import { StructureEntity } from '../pages/[username]/[slug]'
import configUtils from './config_utils'
import { getStructureLink } from './structure_utils'

export function getTwitterShareURLForStructure(structure: StructureEntity): string {
  const url = configUtils.siteURL + getStructureLink(structure)
  const text = `Take a look at ${structure.name} on ${url} %20%23strooapp`
  return `https://twitter.com/intent/tweet?text=${text}`
}
