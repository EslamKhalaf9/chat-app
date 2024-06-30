import UserCard from "@/components/user/user-card";
import { User } from "@/types/user.types";

const users: User[] = [
  {
    id: "1", username: "User 1",
    image: ""
  },
  {
    id: "2", username: "User 2",
    image: ""
  },
  {
    id: "3", username: "User 3",
    image: ""
  },
  {
    id: "4", username: "User 4",
    image: ""
  },
];

export default async function Home() {

  const response = await fetch("http://localhost:5000/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJKYWNvYiIsImVtYWlsIjoiamFrZUBqYWtlLmpha2UiLCJpYXQiOjE3MTk2NjMxNDJ9.UHL6NwPUiiQBxf-Hguvdm3nIRXAE-mfno4B3gra3EAI",
    },
  });
  if (!response.ok) {
    return (
      <div>something went wrong</div>
    )
  }

  const users = await response.json() as User[];

  console.log(users);

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


