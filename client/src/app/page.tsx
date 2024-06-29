import UserCard from "@/components/user/user-card";
import { User } from "@/types/user.types";

const users: User[] = [
  {
    id: "1", username: "User 1",
    avatar: ""
  },
  {
    id: "2", username: "User 2",
    avatar: ""
  },
  {
    id: "3", username: "User 3",
    avatar: ""
  },
  {
    id: "4", username: "User 4",
    avatar: ""
  },
];

export default function Home() {
  return (
    <main className="mt-4">
      {/* user card */}
      <div className="container">
        <div className="w-full h-full flex justify-center items-center flex-wrap gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </main>
  );
}


