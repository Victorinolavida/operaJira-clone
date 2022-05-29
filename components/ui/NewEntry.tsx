import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@mui/system';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const {addEntry} = useContext(EntriesContext)
  const {setIsAddingEntry,addingEntry} = useContext(UIContext)

  
  // const [isOpen, setIsAddingEntry] = useState(false)
  
  const [inputValue, setInputValue] = useState('')
  
  const [touched, setTouched] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    
    setInputValue(event.target.value)

  }

  const onSave = () => {
    if( inputValue.length === 0  ) return;
    
    // console.log(inputValue)

    addEntry(inputValue)

  //limpiando input

  setInputValue('')
  // setIsOpen(false)
  setTouched(false)
  setIsAddingEntry(false)

      
    }

  return (
    <Box sx={{marginBottom:2,paddingX:2}}>
    {

    addingEntry?(

        <>
            <TextField
            fullWidth
            sx={{marginTop:2,marginBottom:1}}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            error={ inputValue.length <= 0 && touched }
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 && touched && "Ingrese un valor"
            }
            value={inputValue}
            //cuando se piorde el foco 
            onBlur={()=>setTouched(true)}
            onChange={onChange}
          
            />


          <Box display='flex' justifyContent='space-between'>
            <Button variant='outlined' color='secondary'
              endIcon={<SaveIcon/>}
              onClick={onSave}
              >
              Guardar
            </Button>

            <Button variant='text'
              onClick={()=>setIsAddingEntry(false)}
            >
              cancelar
            </Button>
          </Box>
        </>

      )
      
      :(
        <Button 
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
          variant='outlined'
          sx={{padding:1}}
          onClick={()=>setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
       )

    }
   </Box>
  )
}
