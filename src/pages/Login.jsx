import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("id", res.data.id);
      nav(res.data.role === "admin" ? "/admin" : "/");
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#eef2f7",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: "35px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "320px",
      gap: "12px",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "10px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      padding: "10px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "5px",
    },
    text: {
      textAlign: "center",
      fontSize: "14px",
      color: "#555",
      marginTop: "10px",
    },
    link: {
      color: "#007bff",
      fontWeight: "bold",
      cursor: "pointer",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={submit}>
        <h2 style={styles.heading}>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Login
        </button>

        <p style={styles.text}>
          No account?
          <span style={styles.link} onClick={() => nav("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
