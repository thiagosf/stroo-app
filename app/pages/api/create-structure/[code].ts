import { NextApiRequest, NextApiResponse } from 'next'

import { createStructureCommands, isSafeStructure, wrapCommand } from '../../../helpers/bash_utils'
import { getTitles } from '../../../helpers/folder_utils'
import { apolloClient } from '../../../lib/apollo_client'
import { SHOW_STRUCTURE } from '../../../queries/structure_queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code } = req.query
    const { data } = await apolloClient.query({
      query: SHOW_STRUCTURE,
      variables: { code }
    })
    const mainDirectory = `${data.getStructure.slug}-${data.getStructure.code}`
    const titles = getTitles(data.getStructure.content)
    if (!isSafeStructure(titles)) throw new Error('Unable to create structure because it is not safe')
    const command = createStructureCommands(mainDirectory, titles)

    res.status(200).send(command)
  } catch (error) {
    res.status(500).send(wrapCommand(`echo ${error.message}`))
  }
}
