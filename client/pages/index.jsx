import React from "react";
import Layout from "../components/layout";
import Link from "next/link";

const Index = () => {
  return (
    <main>
      <h1 className="title">Привет</h1>
      <div className="grid">
        <Link href="/channels">
          <a className="card">
            <h3>Каналы &rarr;</h3>
            <p>Мониторинг каналов здесь</p>
          </a>
        </Link>

        <Link href="/admin">
          <a className="card">
            <h3>Админка &rarr;</h3>
            <p>Здесь можно добавить каналы</p>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .card {
            position: relative;
            overflow: hidden;
            margin: 1rem;
            flex-basis: 100%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            background: white;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease,
              box-shadow 0.5s ease;
            box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.1);
            z-index: 1;
          }

          .card::after {
            content: "";
            position: absolute;
            bottom: -1.95rem;
            right: -1.95rem;
            width: 80px;
            height: 80px;
            opacity: 0.25;
            transform: rotate(-40deg) scale(1);
            border-radius: 50%;
            opacity: 0.5;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAANklEQVQoU2NkIBIwEqmOgXyFU6dObQDZkp2dDaZhAMVEmCKYJLJi8hSCTCLKanwhQL6vcZkKAMbtEAuAaq67AAAAAElFTkSuQmCC");
            background-position: top center;
            background-repeat: repeat;
            background-attachment: scroll;
            z-index: -1;
          }

          .card::before {
            content: "";
            position: absolute;
            top: 0rem;
            right: 0rem;
            width: 25px;
            height: 25px;
            background-color: #ffffff;
            border: 2px solid #cdcdcd;
            opacity: 0.25;
            transform: rotate(-40deg) translate(2px, 2px);
            border-radius: 50%;
            z-index: -1;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
            box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.15);
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .card span small {
            display: block;
          }
        `}
      </style>
    </main>
  );
};

export default Index;
