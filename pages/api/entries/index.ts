import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = {message: string} | IEntry[] | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


  switch (req.method) {
    case 'GET':
      return getEntries(res)
    case 'POST':
      return postEntry(req,res);

    default:
      return res.status(400).json({ message: 'Enpoint no existe' });
  }

  
}



const getEntries = async(res: NextApiResponse<Data>) =>{

  await db.connect();

  const entries = await Entry.find().sort({ createdAt:'ascending' })

  await db.disconnect();

  res.send(entries)


}


const postEntry = async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
  
  const {description} = req.body;

  if(!description) return res.status(400).json({message:'la descricion no debe estar vacia'})

  
  const newEntry = new Entry({

    description,
    createdAt: Date.now(),
  })

  try {
    
    await db.connect()

    newEntry.save()

    await db.disconnect()

    return res.status(201).json(newEntry)
  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(500).json({message:'Algo salio mal'})
  }


}


