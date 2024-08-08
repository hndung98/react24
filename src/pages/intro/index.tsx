import { Link } from "react-router-dom";
import GuestLayout from "../../common/layouts/GuestLayout";

export default function IntroPage() {
  return (
    <GuestLayout>
      <h1>Intro Page</h1>
      <div id="menu">
        <h2 id="menu-item">
          <Link to="/">Home</Link>
        </h2>
        <h2 id="menu-item">
          <Link to="/landing-page">Landing page</Link>
        </h2>
      </div>
    </GuestLayout>
  );
}
