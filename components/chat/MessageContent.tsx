import { useEffect, useRef, forwardRef } from 'react'
import UserMessage from '../ui/message/UserMessage'
import MediaMessage from '../ui/message/MediaMessage'
import { readableDate } from '@/lib/converter'
import Typing from '../ui/Typing'
import { useInView } from 'react-intersection-observer'
import ApiClient from '@/app/api/axios/ApiClient'
import { useInfiniteQuery } from '@tanstack/react-query'

const MESSAGE_LIMIT = 15;

export const getMessages = async (pageParam:number, username:string) => {
  const result = await ApiClient.get(`users/${username}/messages?limit=${MESSAGE_LIMIT}&page=${pageParam}`)
  .then((res) => {
    return res.data.messages;

  })
  .catch((err) => {
    console.log(err.response.data)
    throw new Error('Failed to fetch message');
  })
  return result 
}

const MessageContent = ({
    messages, newMessages, isTyping, targetUsername 
  }:{
    messages: (UserMessage|MediaMessage)[],
    newMessages: (messages:(UserMessage|MediaMessage)[])=>void,
    isTyping: boolean, targetUsername:string
  }) => {
  const messageContainer = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView();
  
    const {
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: async ({pageParam}) => {
      const messages = await getMessages(pageParam, targetUsername);
      newMessages(messages.slice().reverse());
      return messages;
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
      lastPage.length === MESSAGE_LIMIT ? allPages.length + 2 : undefined;
      return nextPage;
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  
  // const checkScroll = () => {
  //   messageContainer!.current!.
  // }

  useEffect(() => {
    messageContainer!.current!.scrollTop = messageContainer!.current!.scrollHeight;
   // // Fungsi untuk scroll ke bawah dengan mempertahankan posisi scroll sebelumnya
   //  const scrollToBottomWithPrevPosition = () => {
   //    const chatList = messageContainer.current;
   //    if (chatList) {
   //      chatList.scrollTop = chatList.scrollHeight - prevScrollHeight.current;
   //    }
   //  };
   //
   //  // Panggil fungsi scroll ke bawah saat messages berubah
   //  scrollToBottomWithPrevPosition();
  },[]);

  return (
  <div ref={messageContainer} className='w-full h-full overflow-y-auto custom-scrollbar scroll-smooth transition-all'>
   <ul  className="w-full h-fit overflow-y-auto flex flex-col gap-4 px-3 pt-4">
      {messages.map((msg,index) => {
        return (
        <MessageWrapper key={index} index={index} ref={ref}>
          {((index > 0 && msg.date !== messages[index-1].date) || index == 0)  && (
            <div className="w-full flexCenter my-5">
              <span className="bg-white dark:bg-dark-semiDark text-xs px-3 py-[6px] rounded-full">{readableDate(msg.date as string)}</span>
            </div>
          )}
          {"message" in msg ? (
            <div  className={`w-full flex ${msg.isCurrentUser ? "justify-end":"justify-start"}`}>
              <UserMessage
              id={msg.id}
              message={msg.message}
              createdAt={msg.createdAt}
              isCurrentUser={msg.isCurrentUser}/>
            </div>
          ) : (
            <div>
              <MediaMessage
              media={msg.media as string[]} 
              createdAt={msg.createdAt} 
              isCurrentUser={msg.isCurrentUser} />
            </div>
          )}
        </MessageWrapper>
        )
      })}
      {isTyping && (
        <Typing /> 
      )}
    </ul>
  </div>

  )
}

const MessageWrapper = forwardRef<HTMLLIElement,{children: React.ReactNode, index: number}>((props, ref) => {
  return props.index == 5 ? (
    <li ref={ref}>
      {props.children}
    </li>
  ) : (
    <li>
      {props.children}
    </li>
    )
})

export default MessageContent
