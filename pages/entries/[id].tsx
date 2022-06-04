import { capitalize,Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField , IconButton} from '@mui/material';
import React,{useState,useMemo, FC, useContext} from 'react'
import { GetServerSideProps } from 'next'

import { Layout } from '../../components/layout/Layout';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { getFormatDistancetoNow } from '../../utils/dateFunction';

const validStatus:EntryStatus[]=['pending','in-progress','finished']

interface Props{
  entry:Entry
}

function EntryPage({entry}:Props) {

  const { updateEntry,deleteEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)


  const isError = useMemo(() => inputValue.trim().length === 0 && touched, [inputValue,touched])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setInputValue(event.target.value)

  }

  const onStatusChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    
    setStatus(event.target.value as EntryStatus)
  }

  const onSave=()=>{

    if(inputValue.trim().length === 0) return;

    const updatedEntry:Entry = {
      ...entry,
      description:inputValue,
      status
    }
    updateEntry(updatedEntry,true);
  }

  return (
    <Layout title={inputValue.substring(0,20)+''}>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop:2,padding:'20px 40px '}}

      >
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title={`Entrada: ${inputValue}`}
                subheader={`Creado en ${getFormatDistancetoNow(entry.createdAt)}`}
                sx={{
                  padding:2
                }}
              />
              <CardContent>
                <TextField 
                  sx={{marginTop:2,marginBottom:1}}
                  fullWidth
                  placeholder='Nueva entrada'
                  autoFocus
                  value={inputValue}
                  multiline
                  label="Nueva entrada"
                  onChange={onChange}
                  helperText={isError && 'ingrese un valor'}
                  onBlur={ ()=>setTouched(true) }
                  error={isError}
                />

                {/* <Radio> */}
                <FormControl>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChange}
                  >
                      {
                        validStatus.map(el =>(
                            <FormControlLabel 
                            key={el}
                            value={el}
                            control={<Radio />}
                            label={capitalize(el)}
                            />

                        ))
                      }
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                disabled={inputValue.trim().length === 0 && touched}
                  startIcon={<SaveAltIcon/>}
                  variant='contained'
                  onClick={onSave}
                  fullWidth
                >
                  Guardar
                </Button>
                      <IconButton sx={{
                      positon:'fixed',
                      bottom:0,
                      right:0,
                      backgroundColor:'red'
                    }}
                      onClick={()=> deleteEntry(entry)}
                    >
                     <DeleteIcon />
                     </IconButton>
              </CardActions>
            </Card>
          </Grid>
      
      </Grid>

    </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {


  
  const {id} = params as {id:string};

  const entry = await dbEntries.getEntriesById(id);

  if(!entry){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  return {
    props:{
      entry
    }
  }
}
export default EntryPage

