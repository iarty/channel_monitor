import Layout from "./views/Layout";
import { routes } from "./routes";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <main className="container">
        <Switch>
          {routes.map(({ component: Component, path, id, exact, children }) => (
            <Route exact={exact} path={path} key={id}>
              <Component routes={children} />
            </Route>
          ))}
        </Switch>
      </main>
    </Layout>
  );
};

export default App;
