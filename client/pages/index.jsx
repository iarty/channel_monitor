import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <main>
      <h1 className="title">Привет</h1>
      <div className="grid">
        <Link href="/channels">
          <a className="card-link">
            <h3>Каналы &rarr;</h3>
            <p>Мониторинг каналов здесь</p>
          </a>
        </Link>

        <Link href="/admin">
          <a className="card-link">
            <h3>Админка &rarr;</h3>
            <p>Здесь можно добавить каналы</p>
          </a>
        </Link>
      </div>
    </main>
  );
};

export default Index;
