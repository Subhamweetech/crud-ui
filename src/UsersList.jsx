import React, { useEffect, useState } from "react";
import api from "./api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading users...</div>;
  if (error) return <div className="container" style={{ color: "red" }}>{error}</div>;

  return (
    <div className="container">
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((u) => (
          <div className="user-row" key={u.id}>
            <div>
              <strong>{u.name}</strong>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{u.email}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
