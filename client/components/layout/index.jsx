import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../header";

export default function Layout({ children, title = "Channel Monitor" }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      {router.pathname !== "/" && (
        <div className="arrow-back-wrapper">
          <span className="arrow-back" onClick={() => router.back()}>
            &larr;
          </span>
          <small>Go back</small>
        </div>
      )}
      {children}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        body {
          font-family: "Poppins", sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        input,
        button,
        select,
        optgroup,
        textarea {
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        .btn-warning.disabled,
        .btn-warning:disabled {
          background-color: #ffdf7f;
          border-color: #ffffff;
        }
        .form-control:disabled,
        .form-control[readonly] {
          background-color: #e9ecef;
          opacity: 1;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-control {
          display: block;
          width: 100%;
          padding: 0.375rem 0.75rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 3px solid #ced4da;
          border-radius: 0;
          transition: border-color ease-in-out 0.3s, box-shadow ease-in-out 0.3s;
        }
        .form-login,
        .form-register,
        .form-post {
          width: 100%;
          padding-bottom: 2rem;
        }
        .page-error {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          height: 90vh;
          padding: 10rem 2rem;
        }
        .btn {
          padding: 0.375rem 0.75rem;
          margin-bottom: 0.75rem;
        }
        .btn-block {
          display: block;
          width: 100%;
        }
        .btn-lg {
          padding: 0.5rem 1rem;
          font-size: 1.125rem;
          line-height: 1.5;
          border-radius: 0;
        }
        .btn-warning {
          color: #fff;
          background-color: #ffc107;
          border-top: 0;
          border-left: 0;
          border-color: #ffc107;
        }
        .home {
          overflow-x: hidden;
        }
        .home::before {
          top: 0rem;
          right: 0rem;
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          opacity: 0.5;
          border-radius: 50%;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAANklEQVQoU2NkIBIwEqmOgXyFU6dObQDZkp2dDaZhAMVEmCKYJLJi8hSCTCLKanwhQL6vcZkKAMbtEAuAaq67AAAAAElFTkSuQmCC");
          background-position: top center;
          background-repeat: repeat;
          background-attachment: scroll;
        }
        .home::after {
          top: 16rem;
          right: 1rem;
          content: "";
          position: absolute;
          transform: rotate(-20deg);
          width: 0;
          height: 0;
          opacity: 0.5;
          z-index: -1;
          border-top: 25px solid transparent;
          border-right: 50px solid #cdcdcd;
          border-bottom: 25px solid transparent;
        }

        #__next {
          position: relative;
          overflow-x: hidden;
          z-index: 0;
        }
        #__next::before {
          content: "";
          position: absolute;
          top: 120px;
          bottom: 0;
          z-index: -1;
          width: 420px;
          transform: rotate(-50deg);
          height: 420px;
          opacity: 0.5;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAANklEQVQoU2NkIBIwEqmOgXyFU6dObQDZkp2dDaZhAMVEmCKYJLJi8hSCTCLKanwhQL6vcZkKAMbtEAuAaq67AAAAAElFTkSuQmCC");
          background-position: top center;
          background-repeat: repeat;
          background-attachment: scroll;
        }
        #__next:after {
          content: "";
          position: absolute;
          bottom: 100px;
          left: 20px;
          width: 120px;
          height: 120px;
          opacity: 0.5;
          z-index: -1;
          border-radius: 50%;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAANklEQVQoU2NkIBIwEqmOgXyFU6dObQDZkp2dDaZhAMVEmCKYJLJi8hSCTCLKanwhQL6vcZkKAMbtEAuAaq67AAAAAElFTkSuQmCC");
          background-position: top center;
          background-repeat: repeat;
          background-attachment: scroll;
        }

        .navbar {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
        }

        .container {
          min-height: 80vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .headline {
          text-transform: capitalize;
          position: relative;
          color: #333333;
        }

        .headline::before {
          position: absolute;
          bottom: -5px;
          left: 0;
          content: "";
          height: 3px;
          width: 20%;
          background-color: #cdcdcd;
        }

        main.content-detail {
          margin-top: 3rem;
          text-align: left;
          display: inline-block;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          padding: 0;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main::before {
          content: "";
          position: absolute;
          bottom: 6rem;
          right: 25rem;
          z-index: -1;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          opacity: 0.25;
          border: 4px solid #cdcdcd;
        }
        main::after {
          content: "";
          position: absolute;
          top: 1rem;
          right: 18rem;
          z-index: -1;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          opacity: 0.25;
          border: 4px solid #cdcdcd;
        }

        .account {
          margin-bottom: 1.5rem;
        }

        .account a {
          color: #0070f3;
          text-decoration: underline;
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
        .account a:hover {
          text-decoration: none;
        }
        .footer-main {
          background-color: white;
        }

        .form-login {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        span {
          font-size: 0.82rem;
        }

        .title a,
        .sub-title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active,
        .sub-title a:hover,
        .sub-title a:focus,
        .sub-title a:active {
          // text-decoration: underline;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3.5rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .logo {
          height: 1em;
        }

        .warning {
          color: #990000;
        }

        .text-center {
          text-align: center;
        }

        .arrow-back-wrapper {
          position: relative;
          margin-left: 20px;
        }
        .arrow-back-wrapper > small {
          display: none;
          position: absolute;
          top: 50px;
          left: -4px;
        }
        .arrow-back {
          position: absolute;
          font-size: 40px;
          cursor: pointer;
        }

        .arrow-back:hover {
          font-size: 45px;
        }

        .arrow-back:hover + small {
          display: block;
        }

        // Extra small devices (portrait phones, less than 576px)
        @media (max-width: 575.98px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        // Small devices (landscape phones, 576px and up)
        @media (min-width: 576px) and (max-width: 767.98px) {
        }
        // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) and (max-width: 991.98px) {
        }
        // Large devices (desktops, 992px and up)
        @media (min-width: 992px) and (max-width: 1199.98px) {
        }
        // Extra large devices (large desktops, 1200px and up)
        @media (min-width: 1200px) {
        }
      `}</style>
      {process.env.NODE_ENV !== "development" && (
        <>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-123722350-3"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'UA-123722350-3');`,
            }}
          />
        </>
      )}
    </div>
  );
}
