import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await api.get("/");
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    await api.delete(`/${id}`);
    confirm("user deleted");
    loadUsers();
  };
  return (
    <div>
      {users.map((user) => (
        <p key={user._id}>
          {user.name}-{user.role}
          <br />
          <button onClick={() => nav(`/edit/${user._id}`)}>edit</button>
          <br />
          <button onClick={() => deleteUser(user._id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Admin;
