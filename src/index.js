import { render } from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

render(
  <Auth0Provider
    domain="dev-0aljb7b7.us.auth0.com"
    clientId="rYMsifGn4lzx7z6afs9TcLxCrhWzQOuK"
    redirectUri={window.location.origin}
    audience="https://dev-0aljb7b7.us.auth0.com/api/v2/"
    scope="read:current_user"
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("app")
);
