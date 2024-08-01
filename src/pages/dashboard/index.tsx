import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Dashboard Page</h2>
      <div id="menu">
        <h2 id="menu-item">
          <Link to="/login">Login</Link>
        </h2>
        <h2 id="menu-item">
          <Link to="/products">Product</Link>
        </h2>
        <h2 id="menu-item">
          <Link to="/contact">Contact</Link>
        </h2>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
