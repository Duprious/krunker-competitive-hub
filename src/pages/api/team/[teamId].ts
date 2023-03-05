import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.teamId as string
  
  const teamData = await prisma.team.findUnique({
    where: {
      id: id
    },
    include: {
      players: true,
      Sub: true,
      tournament: true
    }
  })
  if (!teamData) {
    res.status(404).json({error: "Data not found"})
    return
  }
  res.status(200).json(teamData)
}