import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ConfigLoader from "./components/ConfigLoader";

import { PrimeReactProvider } from "primereact/api";
//import "primereact/resources/themes/tailwind-light/theme.css"
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; // theme
//import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css

//import { RecoilDevTools } from "recoil-gear";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/*     <React.StrictMode> */}
    <ConfigLoader>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </ConfigLoader>
    {/*     </React.StrictMode> */}
  </>
);
