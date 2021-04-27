import Header from "../../components/header";
import { useLocation, useHistory } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <div className="home">
      <Header />
      <div
        className="arrow-back-wrapper"
        style={
          pathname === "/"
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
      >
        <span className="arrow-back" onClick={() => history.goBack()}>
          &larr;
        </span>
        <small>Go back</small>
      </div>
      {children}
    </div>
  );
}
