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
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Register</h2>
        <input required value={form.name} name="name" placeholder="name" onChange={change} />
        <input required value={form.email} name="email" placeholder="email" onChange={change} />
        <input required value={form.password} name="password" placeholder="password" onChange={change} />
        <input required value={form.imageUrl} name="imageUrl" placeholder="imageUrl" onChange={change} />
        {/* ... */}
        <select required value={form.role} name="role" defaultValue="user" onChange={change}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        {form.role === "admin" && (
          <input required value={form.adminCode} name="adminCode" placeholder="admin code" onChange={change} />
        )}
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register;
