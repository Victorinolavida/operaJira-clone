import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { Entry } from '../../interfaces'
import { getFormatDistancetoNow } from '../../utils/dateFunction'

interface Props {
  entry: Entry
}


export const EntryCard:FC<Props> = ({entry}) => {

  const router = useRouter();
  const {startDragging,endDragging} = useContext(UIContext)

  const onDragStart = ( event:DragEvent ) => {
    startDragging()
     event.dataTransfer.setData('text', entry._id)
  }
  
  const onClick = ()=>{
    router.push(`/entries/${entry._id}`)
  }

  const onDragEnd = ()=>{
    endDragging()
  }


  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom:1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line'}}>
           {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'end'}}>
          <Typography variant='body2'>
            hace { getFormatDistancetoNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>

  )
}
