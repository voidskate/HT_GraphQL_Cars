import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import "./App.css";
import "antd/dist/reset.css";

import ShowPage from "./components/displays/ShowPage";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <ShowPage/>
    </div>
  </ApolloProvider>
)

export default App;