import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   console.log(users);
  // }, [users.length]);

  return (
    <>
      <UserList users={users} />
      <hr />
      <UserForm addUsers={setUsers} />
    </>
  );
}

export default App;
