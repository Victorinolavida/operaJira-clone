import React,{ useEffect, useReducer } from 'react'
import { Entry } from '../../interfaces'
import { EntriesContext,entriesReducer } from './'
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';

export interface EntriesProps {
  entries:Entry[]
}

const  ENTRIES_INITIAL_STATE: EntriesProps = {
  entries:[]
}

interface Props{
  children?: React.ReactNode[] | React.ReactNode
}

export const EntriesProvider:React.FC<React.PropsWithChildren<Props>> = ({children}) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addEntry = async(description:string)=>{


    const {data} = await entriesApi.post<Entry>('/entries',{description})
    
    
    dispatch({type:'add-Entry', payload:data})
  }

  const updateEntry= async(entry:Entry)=>{

    
    try {
      //para mas eficiencias
      const {description,status} = entry;

      const {data} = await entriesApi.put<Entry>(`/entries/${entry._id }`,{description,status})

      dispatch({type:'update-Entry',payload:data})
    
    } catch (error) {
      console.log(error)
    }

  }

  const refreshEntries = async() =>{
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispatch({type:'refesh-Entry',payload: data})
  }

  useEffect(() => {
    refreshEntries()

  }, [])
  

  return (
    <EntriesContext.Provider value={{
      ...state,

      addEntry,
      updateEntry
      
    }}>

        {children }
    </EntriesContext.Provider>
  )
}

