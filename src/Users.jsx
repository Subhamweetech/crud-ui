import React, { useEffect, useState } from "react";
import api from "./api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const saveUser = async () => {
    if (editId) {
      await api.put(`/users/${editId}`, { name, email });
    } else {
      await api.post("/users", { name, email });
    }
    setName("");
    setEmail("");
    setEditId(null);
    fetchUsers();
  };

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>User CRUD</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={saveUser}>
        {editId ? "Update" : "Create"}
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => editUser(u)}>Edit</button>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
