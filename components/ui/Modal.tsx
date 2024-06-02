'use client'
import { createContext, useContext, useState } from "react";

export type ModalProvider = {
 showModal:boolean,
 toggleModal:()=>void
}

export const modalContext = createContext<ModalProvider | null>(null); 

const Modal = ({children}:{children:React.ReactNode}) => {
  const [showModal,setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  }
  return (
    <modalContext.Provider value={{ showModal, toggleModal }}>
      <div className="z-[6000]">
        {children}
      </div>
    </modalContext.Provider>
  )
}

export const Trigger = ({children,className}:{children:React.ReactNode,className?:string}) => {
  const { toggleModal } = useContext(modalContext) as ModalProvider;
  const toggle = (e:React.MouseEvent<HTMLButtonElement>) => {
    toggleModal();
  }
  return (
    <button onClick={toggle} className={className}>
      {children}
    </button> 
  )
}

type ModalContent = {
  children:React.ReactNode,
  width:number,
  onClose?: ()=>void,
  className?:string
}

export const Content = ({children, width, onClose, className}:ModalContent) => {
  const { showModal, toggleModal } = useContext(modalContext) as ModalProvider;
  const modalClose = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(onClose) {
      onClose();
      return;
    };
    toggleModal(); 
  }
  return showModal && (
    <div onClick={modalClose} className="fixed inset-0 bg-black/30 flexCenter backdrop-blur z-[6000]">
      <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width
      }}
      className={`h-full sm:h-[95%] md:h-[90%] bg-white dark:bg-dark-semiDark rounded-none sm:rounded-xl flex flex-col ${className}`}>
        {children}
      </div>   
    </div>
  )
}

export const Header = ({children, className}:{children:React.ReactNode, className?:string}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
export const Body = ({children,className}:{children:React.ReactNode,className ?: string}) => {
    return (
      <div className={`h-full overflow-y-auto custom-scrollbar ${className}`}>
          {children}
      </div>
    )
}

export const Footer = ({children,className}:{children:React.ReactNode,className ?: string}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export const CloseButton = ({children, className}:{children:React.ReactNode, className?:string}) => {
  const { toggleModal } = useContext(modalContext) as ModalProvider;
  return (
    <button onClick={() => toggleModal()} className={`w-fit ${className}`}>
      {children}
    </button>
  )
}

export default Modal
