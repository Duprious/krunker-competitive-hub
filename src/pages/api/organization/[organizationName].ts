import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

const organization =  async (req: NextApiRequest, res: NextApiResponse) => {
  const name = req.query.organizationName as string
  
  const organizationData = await prisma.organization.findUnique({
    where: {
      name: name.toUpperCase()
    },
    include:  {
        tournaments: true,
    }
  })
  if (!organizationData) {
    res.status(404).json({error: "Data not found"})
    return
  }
  res.status(200).json(organizationData)
}

export default organization