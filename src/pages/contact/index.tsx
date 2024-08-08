import {
  Form,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { LoaderType } from "../../common/types/loader";
import "./index.css";

export default function ContactPage() {
  const contacts = useLoaderData() as LoaderType;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  if (q && q !== "") {
    const t = contacts.data.filter(
      (value) =>
        value.id.includes(q) ||
        value.first.includes(q) ||
        value.first.includes(q)
    );
    console.log(t);
  }
  // console.log(contacts.data);

  return (
    <>
      <div id="contact-main">
        <div id="sidebar">
          <h1>Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </Form>

            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.data.length > 0 ? (
              <ul>
                {contacts.data.map((contact) => (
                  <li key={contact.id}>
                    <NavLink to={`/contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div
          id="detail"
          className={navigation.state === "loading" ? "loading" : ""}
        >
          <div id="menu">
            <h2 id="menu-item">
              <Link to="/">Home</Link>
            </h2>
            <h2 id="menu-item">
              <Link to="/login">Login</Link>
            </h2>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
