import PersonChatting from '@/components/ilustrations/PersonChatting'

const page = () => {
  return (
    <section className='w-full overflow-hidden bg-white dark:bg-dark-semiDark h-full p-3 sm:block hidden rounded-xl'>
        <div className="w-full h-full flexCenter bg-light dark:bg-dark-dark rounded-xl">
         <PersonChatting /> 
        </div>
    </section>
  )
}

export default page
