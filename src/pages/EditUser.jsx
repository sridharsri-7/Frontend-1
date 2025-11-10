import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditUser = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get(`/profile/${id}`);
        setForm(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch user data");
      }
    };
    getUser();
  }, [id]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/${id}`, form);
      alert("User updated successfully!");
      nav("/admin");
    } catch (error) {
      alert("Failed to update user");
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
      fontWeight: "600",
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
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={submit}>
        <h2 style={styles.heading}>Edit User</h2>

        <input
          style={styles.input}
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={change}
          required
        />

        <input
          style={styles.input}
          placeholder="Image URL"
          name="imageUrl"
          value={form.imageUrl}
          onChange={change}
          required
        />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditUser;
