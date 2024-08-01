import React, { ReactElement } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/error/index.tsx";
import HomePage from "./pages/home/index.tsx";
import LoginPage from "./pages/login/index.tsx";
import ContactPage from "./pages/contact/index.tsx";
import IntroPage from "./pages/intro/index.tsx";
import Contact, {
  ContactIndex,
  EditContact,
  destroyAction,
  editAction,
} from "./pages/contact/Contact.tsx";
import { getContact, getContacts, createContact } from "./services/Axios.ts";

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

const router = createBrowserRouter([
  createRouterObject("/", <HomePage />),
  createRouterObject("/intro", <IntroPage />),
  createRouterObject("/login", <LoginPage />),
  {
    path: "/contacts",
    element: <ContactPage />,
    errorElement: <ErrorPage />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
