import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { FC, PropsWithChildren, ReactNode, useReducer } from 'react'
import { UIContext,uiReducer } from './'



export interface UIState {
  sideMenuOpen:boolean;
  addingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen:false,
  addingEntry: false,
  isDragging:false
}
 
interface Props{
  children?:ReactNode
}


export const UIprovider:FC<PropsWithChildren<Props> >= ({children})=> {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu=() => {
    dispatch({type:'UI-Sidebar-Open'})
  };


  const closeSideMenu=() => {
    dispatch({type:'UI-Sidebar-Close'})
  }

  const setIsAddingEntry = (isAdding:boolean) => {
    dispatch({type:'ENTRY-add-entry',payload: isAdding})
  }

  const startDragging = () =>{
    dispatch({type:'ENTRY-Start-Drag'})
  }

  const endDragging = () =>{
    dispatch({type:'ENTRY-End-Drag'})
  }
  
  return (
    <UIContext.Provider value={{
      ...state,


      //methods
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startDragging,
      endDragging
      
    }}>
      { children }
    </UIContext.Provider>
  )
}
