import store from "@redux/store";
// import "@styles/global.scss";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Script from "next/script";
import "@styles/global.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "@styles/swiper.css";
import ErrorBoundary from "@components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <link
        rel="shortcut icon"
        href="public/icons/favicon.png"
        type="image/x-icon"
      />
      <Script
        strategy="lazyOnload"
        async
        src="https://kit.fontawesome.com/1c4700fdde.js"
        crossOrigin="anonymous"
      />
      {/* {isBrowser && (
          <> */}
      <Script
        async
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) {
        setTimeout(()=>{
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        }, 15000)
      })(window, document, "script", "dataLayer", "GTM-K5D4LGB");`,
        }}
      ></Script>
      <ErrorBoundary>
        <Provider store={store}>
          <Component {...pageProps} />;
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
