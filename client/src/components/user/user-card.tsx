import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "@/types/user.types";
import Link from "next/link";

type UserCardProps = {
  user: User
}

function UserCard({ user }: UserCardProps) { 

  return (
    <div className="w-1/4 shadow p-4">
      <h1 className="text-xl py-2">{user.username}</h1>
      <Link href={`/chat/${user.id}`}>
        <Button>Chat</Button>
      </Link>
    </div>
  )
}

export default UserCard;