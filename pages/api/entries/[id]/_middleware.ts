import mongoose from "mongoose";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";


export function middleware(req:NextRequest,eve:NextFetchEvent){

  if(req.page.name==='/api/entries') return NextResponse.next() 

  const id = req.page.params?.id || '';


  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if(!checkMongoIDRegExp.test(id as string)){
    // return res .status(400).json({ message: 'el id no es valido '+ id })
    const jsonStrint = JSON.stringify({ message: 'el id no es valido '+ id })
    return new Response(jsonStrint,{
      status:400,
      headers:{
        'Content-Type': 'application/json'
      }
    })
  
  }


  return NextResponse.next()
}