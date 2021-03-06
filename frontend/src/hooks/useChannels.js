import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SERVER_URL = "http://192.168.15.6:3333";

export const useChannels = () => {
  const [channels, setChannels] = useState([]);
  const [DT, setDT] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(SERVER_URL);

    socketRef.current.on("connect", (connect) => {
      console.log("SOCKET CONNECT");
    });

    socketRef.current.emit("@get_all_channels");

    socketRef.current.on("channels", (channels) => {
      console.log("SOCKET UPDATE");
      setDT(Date.now());
      setChannels(channels);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { channels, DT };
};
