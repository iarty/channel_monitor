import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <h1 className="title">Привет</h1>
      <div className="grid">
        <Link className="card-link" to="/channels">
          <h3>Каналы &rarr;</h3>
          <p>Мониторинг каналов здесь</p>
        </Link>
        <Link className="card-link" to="/admin">
          <h3>Админка &rarr;</h3>
          <p>Здесь можно добавить каналы</p>
        </Link>
      </div>
    </div>
  );
};

export default Index;
