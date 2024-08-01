import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <ul>
      <li>
        {/* <a href='/' className='nav-link'>Dashboard</a> */}
        <Link to="/" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li>
        {/* <a href='/orders' className='nav-link'>Orders</a> */}
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </li>
    </ul>
  );
}
