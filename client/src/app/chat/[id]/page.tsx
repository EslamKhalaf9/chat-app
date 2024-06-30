import { Chat } from '@/components/chat/chat'
import { User } from '@/types/user.types'
import React from 'react'

const ChatPage = async () => {

  const sender: User = {
    id: "1",
    username: "eslam",
    image: ""
  }

  const response = await fetch("http://localhost:5000/users/2", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJKYWNvYiIsImVtYWlsIjoiamFrZUBqYWtlLmpha2UiLCJpYXQiOjE3MTk2NjMxNDJ9.UHL6NwPUiiQBxf-Hguvdm3nIRXAE-mfno4B3gra3EAI",
    },
  });
  if (!response.ok) {
    return (
      <div>user not found</div>
    )
  }
  const receiver = await response.json() as User;

  console.log("receiver", receiver);

  if (!receiver) {
    return (
      <div>user not found</div>
    )
  }

  return (
    <Chat sender={sender} receiver={receiver} />
  )
}

export default ChatPage