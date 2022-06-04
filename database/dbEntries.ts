import { isValidObjectId } from "mongoose"
import { db } from ".";
import { Entry,IEntry } from "../models";


export const getEntriesById = async(id:string):Promise<IEntry | null> => {

  if(!isValidObjectId(id)){ return null};


  await db.connect()

  //trae la minima informacion necesaria
  const entry = await Entry.findById(id)
  
  await db.disconnect()

  return JSON.parse(JSON.stringify(entry))

}