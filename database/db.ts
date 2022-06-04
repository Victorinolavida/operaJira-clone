import mongoose from "mongoose";

const mongoKey = process.env.MONGO_CONNECTION!


//conexion
/*
  0:disconnected
  1:conected
  2:connecting
  3:disconnection
*/
const monogoConnection = {
  isConnected: 0
}

export const connect = async() => {

  if(monogoConnection.isConnected){
    console.log('ya estamos conectados')
    return
  }

  if(mongoose.connections.length > 0){
    monogoConnection.isConnected = mongoose.connections[0].readyState

    if(monogoConnection.isConnected === 1){
      console.log('Usando conexion anterior')
      return
    }

    await mongoose.disconnect()
  }

  await mongoose.connect(mongoKey)

  monogoConnection.isConnected = 1

  console.log('conectado a mongodb')

}


export const disconnect =async () => {
  
  if(process.env.NODE_ENV === 'development') return

  if( monogoConnection.isConnected !== 0 ) return

  
  await mongoose.disconnect()

  monogoConnection.isConnected = 0

  console.log('Desconectado de mongo')

}