import { createContext } from "react";

interface ContextProps{
  sideMenuOpen:boolean;
  isDragging: boolean;
  addingEntry:boolean;


  openSideMenu:()=>void;
  closeSideMenu:()=>void;
  setIsAddingEntry:(isAdding:boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);

