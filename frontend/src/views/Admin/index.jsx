import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div className="grid">
        <Link to="/admin/channels" className="card-link">
          <h3>Каналы &rarr;</h3>
          <p>Здесь можно администрировать каналы</p>
        </Link>
        <Link to="/admin/providers" className="card-link">
          <h3>Провайдеры &rarr;</h3>
          <p>Здесь можно администрировать провайдеры</p>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
