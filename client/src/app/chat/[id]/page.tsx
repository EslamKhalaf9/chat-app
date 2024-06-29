import { Chat } from '@/components/chat/chat'
import { User } from '@/types/user.types'
import React from 'react'

const ChatPage = () => {

  const sender: User = {
    id: "1",
    username: "User 1",
    avatar: ""
  }

  const receiver: User = {
    id: "2",
    username: "User 2",
    avatar: ""
  }

  return (
    <Chat sender={sender} receiver={receiver} />
  )
}

export default ChatPage