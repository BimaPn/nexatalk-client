const formatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

const months = [
  "January","February","March","April",
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
]

export const getCurrentTime = () => {
  return formatter.format(new Date());
}
export const dateToTime = (date:string) => {
 return formatter.format(new Date(date));
}
export const readableDate = (date:string) => {
  const current = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate()-1);

  if(current.toDateString() === today.toDateString()) {
    return "Today";
  }else if (current.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  const day = current.getDate();
  const month = months[current.getMonth()]
  const year = current.getFullYear();
  
  return `${day} ${month} ${year}`
}

