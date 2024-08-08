import { AppProps } from "../types/app";

export default function GuestLayout(props: AppProps) {
    return (
      <div>
        <div>
          <h2>GuestLayout</h2>
        </div>
        <div>{props.children}</div>
      </div>
    );
}
