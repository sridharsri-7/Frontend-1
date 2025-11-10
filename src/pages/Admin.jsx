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
      alert(error.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/${id}`);
        alert("User deleted successfully!");
        loadUsers();
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  // Unique Inline Styles (Modern Glassmorphism)
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(135deg, #141e30, #243b55)",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "#fff",
      fontFamily: "Poppins, sans-serif",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
      letterSpacing: "1px",
      textShadow: "0 2px 10px rgba(255,255,255,0.3)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px",
      width: "100%",
      maxWidth: "1000px",
    },
    card: {
      backdropFilter: "blur(10px)",
      background: "rgba(255, 255, 255, 0.15)",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      borderRadius: "20px",
      padding: "25px",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
    },
    img: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid rgba(255,255,255,0.6)",
      marginBottom: "10px",
    },
    name: {
      fontWeight: "600",
      fontSize: "18px",
      color: "#fff",
      marginBottom: "5px",
    },
    role: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.8)",
      marginBottom: "15px",
      textTransform: "capitalize",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    editBtn: {
      backgroundColor: "#00b4d8",
      color: "white",
    },
    deleteBtn: {
      backgroundColor: "#ef233c",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👑 Admin Dashboard</h2>
      <div style={styles.grid}>
        {users.map((user) => (
          <div
            key={user._id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.name} style={styles.img} />
            ) : (
              <img
                src="https://via.placeholder.com/80"
                alt="default"
                style={styles.img}
              />
            )}
            <p style={styles.name}>{user.name}</p>
            <p style={styles.role}>{user.role}</p>
            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.editBtn }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0077b6")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00b4d8")}
                onClick={() => nav(`/edit/${user._id}`)}
              >
                Edit
              </button>
              <button
                style={{ ...styles.button, ...styles.deleteBtn }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#9b1c26")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ef233c")}
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
