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
      alert(error.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#eef2f7",
      padding: "20px",
    },
    card: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "350px",
      textAlign: "center",
    },
    heading: {
      color: "#333",
      marginBottom: "15px",
      fontWeight: "600",
    },
    userItem: {
      backgroundColor: "#f8f9fa",
      margin: "8px 0",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      color: "#555",
      fontSize: "15px",
    },
    name: {
      fontWeight: "bold",
      color: "#007bff",
    },
    role: {
      color: "#333",
      textTransform: "capitalize",
    },
  };

  // Render based on user role
  if (user.role === "user") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>User Dashboard</h2>
          <p style={styles.userItem}>
            <span style={styles.name}>{user.name}</span> –{" "}
            <span style={styles.role}>{user.role}</span>
          </p>
        </div>
      </div>
    );
  } else {
    const userArr = user?.filter((u) => u._id === localStorage.getItem("id"));
    console.log(userArr);
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Admin Dashboard</h2>
          {userArr.map((u) => (
            <p key={u._id} style={styles.userItem}>
              <span style={styles.name}>{u.name}</span> –{" "}
              <span style={styles.role}>{u.role}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
