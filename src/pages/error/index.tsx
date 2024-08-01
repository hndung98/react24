import { useState } from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const [count, setCount] = useState(0);
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>Error Page</h1>
      <div id="menu">
        <h2 id="menu-item">
          <Link to="/">Home</Link>
        </h2>
        <h2 id="menu-item">
          <Link to="/contacts">Contacts</Link>
        </h2>
        <h2 id="menu-item">
          <Link to="/login">Login</Link>
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
