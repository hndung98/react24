import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  ParamParseKey,
  Params,
} from "react-router-dom";
import { ContactType } from "../common/types/user";
import { LoaderType } from "../common/types/loader";

export function Get(url: string) {
  console.log(url);
}
const listContacts = [
  {
    id: "c1",
    first: "Alan",
    last: "Becker",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
  {
    id: "c2",
    first: "Arron",
    last: "Ramsey",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
  {
    id: "c3",
    first: "Gareth",
    last: "Bale",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
  {
    id: "c4",
    first: "Gareth",
    last: "Barry",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
  {
    id: "c5",
    first: "Wayne",
    last: "Rooney",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
];

export const getContacts: LoaderFunction = async (
  params: LoaderFunctionArgs
) => {
  const filterString = new URL(params.request.url).searchParams.get("q");
  console.log("filterString", filterString);

  const apiUrl = "http://localhost:5050/api";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    return {
      data:
        filterString && filterString !== ""
          ? listContacts.filter(
              (v) =>
                v.first.includes(filterString) ||
                v.last.includes(filterString) ||
                v.id.includes(filterString)
            )
          : listContacts,
    } as LoaderType;
  } catch (error: unknown) {
    console.error(error);
    return { data: [] };
  }
};
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const PathNames = {
  contactId: "contacts/:contactId",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.contactId>>;
}
export const getContact: LoaderFunction = async ({ params }: Args) => {
  const contactId = params.contactId;
  const url = "http://localhost:5050/api";
  try {
    console.time("test");
    const response = await fetch(url);
    await delay(1000);
    console.timeEnd("test");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    const res = listContacts.filter((v) => v.id === contactId);

    return { data: res } as LoaderType;
  } catch (error: unknown) {
    console.error(error);
    return { data: [] };
  }
};

export const createContact = async () => {
  const url = "http://localhost:5050/api";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    const contact1 = {
      id: "c4",
      first: "New",
      last: "Person",
      avatar: "https://robohash.org/you.png?size=200x200",
      twitter: "your_handle",
      notes: "Some notes",
      favorite: true,
    } as ContactType;
    const listContacts = [contact1];

    return { data: listContacts } as LoaderType;
  } catch (error: unknown) {
    console.error(error);
    return { data: [] };
  }
};
