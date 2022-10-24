import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query
  const command = `#!/usr/bin/env bash

mkdir -p hello/${code}`

  res.status(200).send(command)
}
