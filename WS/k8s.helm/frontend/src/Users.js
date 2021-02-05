import React, { useState, useEffect } from "react";
import axios from "axios";

function GetRequestHooks() {
  const [users, setUsers] = useState([
    { id: 1, username: "demo 01" },
    { id: 2, username: "demo 02" },
    { id: 3, username: "demo 03" },
  ]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get("/api/users")
      .then((response) => setUsers(response.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="card text-center m-3">
      <h5 className="card-header">List of users</h5>
      <ul className="card-body">
        {users && users.map((user) => <p>{user.username}</p>)}
      </ul>
    </div>
  );
}

export { GetRequestHooks };
