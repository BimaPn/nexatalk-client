import { io,Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3500";

const socketInit = (namespace:string,accessToken:string):Socket => {
  const socket = io(URL + namespace,{query:{accessToken:accessToken}});
  return socket;
}
export default socketInit;
