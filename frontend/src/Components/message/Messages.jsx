import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "./../skeleton/MessageSkeleton";
import useListenMessages from "../../Hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages?.length > 0 &&
        messages.map((message) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-center text-white ">
            Send a message to start a conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
