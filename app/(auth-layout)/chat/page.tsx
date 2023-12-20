import PersonChatting from '@/components/ilustrations/PersonChatting'

const page = () => {
  return (
    <section className='w-full overflow-hidden bg-white h-full p-3 sm:block hidden rounded-xl'>
        <div className="w-full h-full flexCenter flex-col gap-6 bg-light rounded-xl">
         <PersonChatting /> 
         <h1 className="font-medium text-2xl text-semiDark">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, id!</h1>
        </div>
    </section>
  )
}

export default page
