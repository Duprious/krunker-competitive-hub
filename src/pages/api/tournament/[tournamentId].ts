import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.tournamentId as string
  const tournamentData = await prisma.tournament.findUnique({
    where: {
      id: id
    },
    include: {
      teams: {
        include: {
          players: true,
          Sub: true,
        }
      },
      Organization: true,
    }
  })
  if (!tournamentData) {
    res.status(404).json({error: "Data not found"})
    return
  }
  res.status(200).json(tournamentData)
}