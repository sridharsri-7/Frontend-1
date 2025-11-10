import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminCode: "",
    imageUrl: "",
  });

  const nav = useNavigate();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/register", form);
      console.log(res.data);
      alert("Registered successfully");
      nav("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  // Inline CSS styles
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
    select: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "#fff",
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
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={submit}>
        <h2 style={styles.heading}>Register</h2>

        <input
          style={styles.input}
          required
          value={form.name}
          name="name"
          placeholder="Name"
          onChange={change}
        />
        <input
          style={styles.input}
          required
          value={form.email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={change}
        />
        <input
          style={styles.input}
          required
          value={form.password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={change}
        />
        <input
          style={styles.input}
          required
          value={form.imageUrl}
          name="imageUrl"
          placeholder="Image URL"
          onChange={change}
        />

        <select
          style={styles.select}
          required
          value={form.role}
          name="role"
          onChange={change}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "admin" && (
          <input
            style={styles.input}
            required
            value={form.adminCode}
            name="adminCode"
            placeholder="Admin Code"
            onChange={change}
          />
        )}

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
