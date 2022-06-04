import React,{ useEffect, useReducer } from 'react'
import { Entry } from '../../interfaces'
import { EntriesContext,entriesReducer } from './'
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

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
  
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addEntry = async(description:string)=>{


    const {data} = await entriesApi.post<Entry>('/entries',{description})
    
    
    dispatch({type:'add-Entry', payload:data})
  }

  const updateEntry= async(entry:Entry,showSnackbar=false)=>{

    
    try {
      //para mas eficiencias
      const {description,status} = entry;

      const {data} = await entriesApi.put<Entry>(`/entries/${entry._id }`,{description,status})

      dispatch({type:'update-Entry',payload:data})

      if(showSnackbar){

        enqueueSnackbar('Entrada actualizada',{
          variant:'success',
          autoHideDuration:1500,
          anchorOrigin:{
            vertical:'top',
            horizontal:'right'
          }
        })
      }
    
    } catch (error) {
      console.log(error)
    }

  }

  const deleteEntry = async(entry:Entry)=>{

    try {
      await entriesApi.delete<Entry>(`/entries/${entry._id }`)
      router.replace('/')
      enqueueSnackbar('Entrada eliminada',{
        variant:'error',
        autoHideDuration:1500,
        anchorOrigin:{
          vertical:'top',
          horizontal:'right'
        }
      });
      dispatch({type:'delete-entry',payload:entry})
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
      updateEntry,
      deleteEntry
      
    }}>

        {children }
    </EntriesContext.Provider>
  )
}

