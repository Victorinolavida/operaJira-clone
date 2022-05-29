import React, { DragEvent, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard'
import { EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import style from './entryStyle.module.css'

interface Props {
  status : EntryStatus
}


export const EntryList:React.FC<Props> = ({status}) => {

  const { entries,updateEntry } = useContext(EntriesContext);
  const {isDragging,endDragging} = useContext(UIContext)


  /*se usa el useMemo para que react no tenga que renderizar todas
  las entries ya que pueden ser muchas
  */
  const entriesByStatus = useMemo(() =>  entries.filter( entry => entry.status === status ),[entries])

  const dropEntry = (event:DragEvent<HTMLDivElement>)=>{
    const id = event.dataTransfer.getData('text')

    const entry =entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry)
    endDragging()
  }

  const allowDrop=(event:DragEvent<HTMLDivElement>)=>{
    event.preventDefault()
  }

  return (
    <div
      onDrop={dropEntry}
      onDragOver={allowDrop}
      className={ isDragging?style.dragging:'' }
      >

      <Paper sx={{ height:'calc(100vh - 250px)', overflow:'scroll', backgroundColor:'transparent','&::-webkit-scrollbar': { display: 'none' },
      padding:'5px 10px'
    }}>

        <List sx={{opacity:isDragging?0.2:1,transition:'all 0.2s'}}>

         {

          entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry}/>
          ))

         }


        </List>
        
      </Paper>
    </div>
  )
}
