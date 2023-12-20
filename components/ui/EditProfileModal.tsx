"use client"
import { BiSolidEdit } from "react-icons/bi"
import Modal, {Trigger, Content, Header, Body, Footer, CloseButton, modalContext, ModalProvider} from "./Modal"
import { useContext, useEffect, useState } from "react"
import PrimaryButton from "./form/PrimaryButton"
import { IoMdClose } from "react-icons/io"
import AvatarInput from "./form/AvatarInput"
import TextInput from "./form/TextInput"
import InputLabel from "./form/InputLabel"
import TextArea from "./form/TextArea"

const EditProfileModal = () => {
  return (
    <Modal>
      <Trigger>
        <button className="min-w-[36px] aspect-square flexCenter bg-light rounded-lg">
          <BiSolidEdit className="text-xl" />
        </button>
      </Trigger> 
      <FormEditProfile />
    </Modal>
  )
}

type ProfileEdit = {
  name:string,
  bio:string,
  avatar:File | null
}

const FormEditProfile = () => {
  const { toggleModal } = useContext(modalContext) as ModalProvider;
  const [formData, setFormData] = useState<ProfileEdit>({
    name:"",
    bio:"",
    avatar:null
  });
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  useEffect(() => {
    if(formData.name.length > 0 || formData.avatar !== null || formData.bio.length > 0) {
      setIsFormDirty(true);
    } else {
      setIsFormDirty(false);
    }
  },[formData]);
  const formSubmit = (e:React.FormEvent) => {
   alert("submit.") 
  }
  const closeForm = () => {
    if(!isFormDirty) {
      toggleModal();
      return;
    }
    const shouldLeave = confirm("You have unsaved changes. Are you sure you want to leave the page ?"); 
    if(shouldLeave) {
      setFormData({name:"",bio:"",avatar:null});
      toggleModal();
    }
  }
  return (
    <form onSubmit={formSubmit}>
      <Content
      width={472} 
      onClose={() => closeForm()} className="overflow-hidden"
      >
        <Header>
          <ModalHeader onClose={() => closeForm()}/> 
        </Header>
        <Body>
          <AvatarInput
          defaultAvatar="/images/people/1.jpg"
          onChange={(file) => setFormData({...formData,avatar:file})}
          className="mt-3 mb-7"
          />
          <div className="px-5 flex flex-col gap-4">
            <div className="relative">
              <TextInput
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name:e.target.value})}
              />
              <InputLabel forInput="name" value="Name" />
            </div>
            <div className="relative opacity-50">
              <TextInput
              id="username"
              value={`bimapn12`}
              readOnly
              className="text-gray-500 focus:!outline-0"
              />
              <InputLabel forInput="username" value="username"/>
            </div>
            <div className="relative opacity-50">
              <TextInput
              id="email"
              value={`bimapn12@gmail.com`}
              readOnly
              className="text-gray-500 focus:!outline-0"
              />
              <InputLabel forInput="email" value="Email"/>
            </div>
            <div className="relative">
              <TextArea 
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}/>
              <InputLabel forInput="bio" value="Bio" textarea />
            </div>
          </div>
        </Body>
        <Footer className="px-4 pt-1 pb-4">
          <PrimaryButton className="!w-fit !rounded-lg !text-sm">
            Edit 
          </PrimaryButton>
        </Footer>
      </Content>
    </form>
  )
}

const ModalHeader = ({onClose}:{onClose:()=>void}) => {
  return (
    <div className="grid grid-cols-3 px-2 py-[6px]">
      <div>
        <button type="button" onClick={() => onClose()} className="w-10 aspect-square flexCenter">
          <IoMdClose className="text-[22px]" />
        </button> 
      </div>
      <span className="w-full block flexCenter font-medium">Edit Profile</span>
      <div></div>
    </div>
    )
}

export default EditProfileModal
