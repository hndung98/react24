import {
  ActionFunction,
  ActionFunctionArgs,
  Form,
  ParamParseKey,
  Params,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { LoaderType } from "../../common/types/loader";
import { ContactType } from "../../common/types/user";

export default function Contact() {
  const { data } = useLoaderData() as LoaderType;
  const contact = {} as ContactType;
  if (data.length > 0) {
    contact.id = data[0].id;
    contact.first = data[0].first;
    contact.last = data[0].last;
    contact.avatar = data[0].avatar;
    contact.twitter = data[0].twitter;
    contact.favorite = data[0].favorite;
  }

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export function ContactIndex() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
    </p>
  );
}

type FavoriteProps = {
  contact: ContactType;
};
function Favorite(props: FavoriteProps) {
  const { contact } = props;
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

const PathNames = {
  contactId: "contacts/:contactId/edit",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.contactId>>;
}
export const editAction: ActionFunction = async ({ params }: Args) => {
  //   const formData = await request.formData();
  console.log("params", params);

  //   const updates = Object.fromEntries(formData);
  //   await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export function EditContact() {
  const navigate = useNavigate();
  const { data } = useLoaderData() as LoaderType;
  const contact = {} as ContactType;
  if (data.length > 0) {
    contact.id = data[0].id;
    contact.first = data[0].first;
    contact.last = data[0].last;
    contact.avatar = data[0].avatar;
    contact.twitter = data[0].twitter;
    contact.favorite = data[0].favorite;
  }

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact?.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}

export const destroyAction: ActionFunction = async ({ params }: Args) => {
  console.log("params", params);
  throw new Error("oh dang!");

  return redirect("/");
};
