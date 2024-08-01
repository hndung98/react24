import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <>
      <div id="sidebar">
        <h1>HOME PAGE</h1>
      </div>
      <div id="detail">
        <div id="menu">
          <h2 id="menu-item">
            <Link to="/contacts">Contacts</Link>
          </h2>
          <h2 id="menu-item">
            <Link to="/login">Login</Link>
          </h2>
        </div>
      </div>
    </>
  );
}
