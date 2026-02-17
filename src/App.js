import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./Users";
import UsersList from "./UsersList";


function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>
        Go to <Link to="/users-add">Users CRUD</Link>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users-add" element={<Users />} />
      </Routes>
    </>
  );
}
