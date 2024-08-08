import React, { ReactElement } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import BlogPage from "./pages/Blog/index.tsx";
import CheckoutPage from "./pages/Checkout/index.tsx";
import Contact, {
  ContactIndex,
  destroyAction,
  editAction,
  EditContact,
} from "./pages/Contact/Contact.tsx";
import ContactPage from "./pages/Contact/index.tsx";
import DashboardPage from "./pages/Dashboard/index.tsx";
import ErrorPage from "./pages/Error/index.tsx";
import HomePage from "./pages/Home/index.tsx";
import IntroPage from "./pages/Intro/index.tsx";
import LandingPage from "./pages/Intro/LandingPage.tsx";
import SignInPage from "./pages/SignIn/index.tsx";
import SignUpPage from "./pages/SignUp/index.tsx";
import { createContact, getContact, getContacts } from "./services/Axios.ts";

type RouteObjectType = {
  path: string;
  element: ReactElement;
};

function createRouterObject(
  path: string,
  element: ReactElement,
  children?: RouteObjectType[]
) {
  const routerObject = {} as RouteObject;
  routerObject.path = path;
  routerObject.element = element;
  routerObject.errorElement = <ErrorPage />;
  if (children) {
    const routerChildren = [] as RouteObject[];
    children.forEach((child) => {
      const tempObject = {} as RouteObject;
      tempObject.path = child.path;
      tempObject.element = child.element;
      routerChildren.push(tempObject);
    });
    routerObject.children = routerChildren;
  }
  return routerObject;
}

type PrivateRoutesProps = {
  keyText: string;
  url: string;
};
function PrivateRoutes(props: PrivateRoutesProps) {
  const isAuth = localStorage.getItem(props.keyText);
  return isAuth ? <Outlet /> : <Navigate to={props.url} />;
}

const protectedRoutes = createRoutesFromElements(
  <Route
    element={<PrivateRoutes keyText="isAuth" url="/sign-in" />}
    errorElement={<ErrorPage />}
  >
    <Route path="/" element={<HomePage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
);
const publicRoutes = [
  createRouterObject("/landing", <LandingPage />),
  createRouterObject("/intro", <IntroPage />),
  createRouterObject("/sign-in", <SignInPage />),
  createRouterObject("/sign-up", <SignUpPage />),
  createRouterObject("/blog", <BlogPage />),
  {
    path: "/contacts",
    element: <ContactPage />,
    loader: getContacts,
    action: createContact,
    children: [
      {
        index: true,
        element: <ContactIndex />,
      },
      {
        path: ":contactId",
        element: <Contact />,
        loader: getContact,
      },
      {
        path: ":contactId/edit",
        element: <EditContact />,
        loader: getContact,
        action: editAction,
      },
      {
        path: ":contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
];

const router = createBrowserRouter(protectedRoutes.concat(publicRoutes));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
