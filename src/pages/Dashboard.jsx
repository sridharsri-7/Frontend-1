import { useEffect, useState } from "react";
import api from "../api";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const loadUsers = async () => {
    try {
      const res = await api.get("/");
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (user.role === "user") {
    return (
      <div>
        {user.name}-{user.role}
      </div>
    );
  } else {
    const userArr = user?.filter((u) => u._id === localStorage.getItem("id"));
    console.log(userArr);
    return (
      <div>
        {userArr.map((user) => (
          <p key={user._id}>
            {user.name} - {user.role}
          </p>
        ))}
      </div>
    );
  }
};

export default Dashboard;
