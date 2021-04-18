import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

import { wrapper } from "../store/";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
