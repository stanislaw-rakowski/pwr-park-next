import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data } from '../../lib/types'
import data from '../../static/response.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json(data)
}
