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
    if (!name || !email) return alert("Name & Email required");

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

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>User Management</h2>

      <div className="form-row">
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={saveUser}>
          {editId ? "Update User" : "Create User"}
        </button>
      </div>

      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        users.map((u) => (
          <div className="user-row" key={u.id}>
            <div>
              <strong>{u.name}</strong>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{u.email}</div>
            </div>

            <div className="actions">
              <button
                className="secondary"
                onClick={() => {
                  setName(u.name);
                  setEmail(u.email);
                  setEditId(u.id);
                }}
              >
                Edit
              </button>
              <button
                className="danger"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
