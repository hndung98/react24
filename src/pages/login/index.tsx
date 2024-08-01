import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Login Page</h1>
      <div id="menu">
        <h2 id="menu-item">
          <Link to="/">Home</Link>
        </h2>
        <h2 id="menu-item">
          <Link to="/contacts">Contacts</Link>
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
