import { useState, useEffect } from "react";
import { UserType } from "./interfaces";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    console.log(users);
  });

  return (
    <>
      <UserList users={users} />
      <hr />
      <UserForm addUsers={setUsers} />
    </>
  );
}

export default App;
