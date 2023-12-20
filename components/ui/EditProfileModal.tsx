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
import ApiClient from "@/app/api/axios/ApiClient"
import { useSession } from "next-auth/react"
import InputError from "./form/InputError"

const EditProfileModal = ({accessToken, userAuth}:SessionInfo) => {
  return (
    <Modal>
      <Trigger className="min-w-[36px] aspect-square flexCenter bg-light rounded-lg">
        <BiSolidEdit className="text-xl" />
      </Trigger> 
      <FormEditProfile accessToken={accessToken} userAuth={userAuth} />
    </Modal>
  )
}

type ProfileEdit = {
  name:string,
  bio:string,
  avatar:File | null
}

const FormEditProfile = ({accessToken, userAuth}:SessionInfo) => {
  const { toggleModal } = useContext(modalContext) as ModalProvider;
  const { data:session, update } = useSession();
  const [ formData, setFormData ] = useState<ProfileEdit>({
    name:userAuth.name,
    bio:userAuth.bio,
    avatar:null
  });
  const [errors,setErrors] = useState<any>({});
  const [ disabledButton, setDisabledButton ] = useState<boolean>(true);

  useEffect(() => {
    if(formData.name !== userAuth.name || formData.avatar !== null || formData.bio !== userAuth.bio) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  },[formData]);

  const formSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    await ApiClient.put(`users/${userAuth.username}/update`
    ,formData, {
    headers: {
    'Content-Type': 'multipart/form-data'
    }})
    .then((res) => {
      update({
      ...session,
      user:{
        ...session?.user,
        name : res.data.user.name,
        bio : res.data.user.bio,
        avatar : res.data.user.avatar
      }
      });
      toggleModal();
    })
    .catch((err) => {
      setErrors(err.response.data.errors);
    })

  }
  const closeForm = () => {
    if(disabledButton) {
      toggleModal();
      return;
    }
    const shouldLeave = confirm("You have unsaved changes. Are you sure you want to leave the page ?"); 
    if(shouldLeave) {
      setFormData({name:userAuth.name,bio:userAuth.bio,avatar:null});
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
          <div className="flex flex-col gap-4 mt-3 mb-7">
            <AvatarInput
            defaultAvatar={userAuth.avatar}
            onChange={(file) => setFormData({...formData,avatar:file})}
            />
            <InputError message={errors.message} className="text-center"/>  
          </div>

          <div className="px-5 flex flex-col gap-4">
            <div className="relative">
              <TextInput
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name:e.target.value})}
              required
              />
              <InputLabel forInput="name" value="Name" />
              <InputError message={errors.name?.message} className="my-1"/>  
            </div>
            <div className="relative opacity-50">
              <TextInput
              id="username"
              value={userAuth.username}
              readOnly
              className="text-gray-500 focus:!outline-0"
              />
              <InputLabel forInput="username" value="username"/>
            </div>
            <div className="relative opacity-50">
              <TextInput
              id="email"
              value={userAuth.email}
              readOnly
              className="text-gray-500 focus:!outline-0"
              />
              <InputLabel forInput="email" value="Email"/>
            </div>
            <div className="relative">
              <TextArea 
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              required
              />
              <InputLabel forInput="bio" value="Bio" textarea />
              <InputError message={errors.bio?.message} className="my-1"/>  
            </div>
          </div>
        </Body>
        <Footer className="px-4 pt-1 pb-4">
          <PrimaryButton disabled={disabledButton} type="submit" className="!w-fit !rounded-lg !text-sm">
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
