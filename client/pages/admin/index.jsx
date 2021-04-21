import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  return (
    <div className="grid" style={{ margin: "auto" }}>
      <a className="card-link" onClick={() => router.push("/admin/channels")}>
        <h3>Каналы &rarr;</h3>
        <p>Здесь можно администрировать каналы</p>
      </a>
      <a className="card-link" onClick={() => router.push("/admin/providers")}>
        <h3>Провайдеры &rarr;</h3>
        <p>Здесь можно администрировать провайдеры</p>
      </a>
    </div>
  );
};

export default Admin;
