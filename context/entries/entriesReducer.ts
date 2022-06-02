import { Entry } from "../../interfaces";
import { EntriesProps } from "./EntriesProvider";

type ActionEntries = 
| {type:'add-Entry',payload: Entry}
| {type:'update-Entry',payload: Entry}
| {type:'refesh-Entry',payload: Entry[]}



export const entriesReducer = (state:EntriesProps,action:ActionEntries) => {
  switch (action.type) {
    case 'add-Entry':
    return {
      ...state,
      entries: [...state.entries, action.payload]
    }
    case 'update-Entry':
    return {
      ...state,
      entries: state.entries.map(entry => {
        if( entry._id  === action.payload._id ){
          entry.status = action.payload.status;
          entry.description = action.payload.description;
        }
        return entry
      })
    }
    case 'refesh-Entry':
      return {
        ...state,
        entries:[...action.payload]
      }
  
    default:
      return state
  }  
}
