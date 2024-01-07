"use client"
import { TbCameraPlus } from "react-icons/tb"
import Modal, { Body, Content, Footer, Header, ModalProvider, Trigger, modalContext } from "./ui/Modal"
import { useContext, useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import ReactPlayer from "react-player/lazy"
import Image from "next/image"
import TextAreaExpand from "./ui/form/TextAreaExpand"
import { IoSend } from "react-icons/io5"
import ApiClient from "@/app/api/axios/ApiClient"
import { userSessionContext, UserSession } from "./providers/UserSessionProvider"
import { SocketProvider, socketContext } from "./providers/SocketProvider"
import { storyListContext } from "./providers/StoryListProvider"
import { dateToTime } from "@/lib/converter"

type MediaPreview = {
  type:string,
  url:string
}

const AddStory = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ media, setMedia ] = useState<File|null>(null);
  const [ mediaPreview, setMediaPreview ] = useState<MediaPreview>({type:"",url:""});

  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = inputRef.current!.files![0];
    if (!selectedFile) return;

    setMedia(selectedFile)
    const blob = URL.createObjectURL(selectedFile);
    if(selectedFile.type.startsWith("video")) {
      setMediaPreview({ type:"video", url:blob })
      return;
    }
    setMediaPreview({type:"image", url: blob});
  }
  const openFile = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      inputRef.current?.click()
  }
  const cleaningStates = () => {
    setMedia(null);
    setMediaPreview({type:"",url:""});
  }
  return (
    <Modal>
      <input
      ref={inputRef}
      type="file" 
      accept=".jpg, .jpeg, .png, video/mp4"
      onChange={onInputChange} 
      className="hidden"
      />
      <button onClick={openFile} className="w-9 aspect-square flexCenter">
        <TbCameraPlus className="text-2xl"  />
      </button>
      <FormContent media={media} mediaPreview={mediaPreview} onFinished={() => cleaningStates()}/> 
    </Modal>
  )
}

const FormContent = ({media, mediaPreview, onFinished}:{media: File|null, mediaPreview:MediaPreview, onFinished:()=>void}) => {
  const { storiesSocket } = useContext(socketContext) as SocketProvider;
  const { updateUserStory } = useContext(storyListContext) as StoryListProvider;
  const { showModal, toggleModal } = useContext(modalContext) as ModalProvider;
  const [caption, setCaption] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if(mediaPreview.url.length !== 0) {
      toggleModal();
    }
  },[mediaPreview]);
  
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    await ApiClient.post("stories/add",{media, caption}, {
    headers: {
    'Content-Type': 'multipart/form-data'
    }})
    .then((res) => {
      const createdAt = res.data.story.createdAt;
      updateUserStory(dateToTime(createdAt));
      storiesSocket.emit("newStory",createdAt);
      toggleModal();
      onFinished();
      setIsDisabled(false);
    })
    .catch((err) => {
      setIsDisabled(false);
    });
  }
  return (showModal && mediaPreview.url.length != 0) && (
    <form onSubmit={onSubmit}>
      <Content width={480} className="relative overflow-hidden">
        <Header className="absolute top-0 left-0 right-0">
          <div className="px-2 py-2">
            <button type="button" onClick={() => toggleModal()} className="w-8 aspect-square bg-dark/25 flexCenter rounded-full">
              <IoMdClose className="text-[22px] text-white" />
            </button> 
          </div>
        </Header>
        <Body className="flexCenter h-full border">
          {mediaPreview.type == "video" ? (
           <ReactPlayer url={mediaPreview.url} className="max-w-full max-h-full" controls/>
          ) : (
            <Image src={mediaPreview.url} alt="image preview" width={500} height={500}className="w-auto max-h-full block"/>
          )} 
        </Body>
        <Footer className="absolute bottom-0 left-0 right-0 flexCenter gap-3 px-3 pb-5 pt-16 shadow-bottom-top">
          <div className="w-[90%] max-h-[64px] overflow-auto rounded-full bg-light py-2 px-4 border">
            <TextAreaExpand
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="text-[15px] bg-transparent"
            rows={1}
            placeholder="Type a caption" />
          </div>  
        <button disabled={isDisabled} type="submit" className="w-10 flexCenter aspect-square rounded-full bg-white border">
          <IoSend className="text-[20px] text-primary -mr-[3px]"/>
        </button>
        </Footer>
      </Content>  
    </form>
  )
}

export default AddStory
