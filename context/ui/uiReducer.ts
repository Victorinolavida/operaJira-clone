import { UIState } from "./";

type UIActionType = 
| { type:'UI-Sidebar-Open'} 
| { type:'UI-Sidebar-Close'} 
| { type:'ENTRY-add-entry', payload:boolean}
| { type:'ENTRY-Start-Drag'}
| { type:'ENTRY-End-Drag'}



export const uiReducer = (state:UIState,action:UIActionType) => {

    switch (action.type) {
      case 'UI-Sidebar-Open':
      return {
        ...state,
        sideMenuOpen:true
      }
      case 'UI-Sidebar-Close':
      return {
        ...state,
        sideMenuOpen:false
      }
      case 'ENTRY-add-entry':
      return {
        ...state,
        addingEntry: action.payload
      }
      case 'ENTRY-Start-Drag':
        return {
          ...state,
          isDragging:true
        }
      case 'ENTRY-End-Drag':
        return {
          ...state,
          isDragging:false
        }

      default:
        return state;
    }

}