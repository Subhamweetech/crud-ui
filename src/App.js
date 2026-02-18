import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./Users";
import UsersList from "./UsersList";
import RollbackTest from "./RollbackTest";
import api from "./api";


function Home() {
  const [data, setData] = React.useState(null);

  useEffect(() => {
      fetchDetails();
    }, []);

  const fetchDetails = async () => {
    const res = await api.get("/demo");    
    setData(res.data.message);
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>{data}</p>
      <p>Manage users, test rollback logic and monitor system health.</p>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Link to="/users-add">
          <button>Manage Users</button>
        </Link>

        <Link to="/users">
          <button className="secondary">View Users</button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/users-add">Manage Users</Link>
        <Link to="/rollback-test">Rollback Test</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users-add" element={<Users />} />
        <Route path="/rollback-test" element={<RollbackTest />} />
      </Routes>
    </>
  );
}
