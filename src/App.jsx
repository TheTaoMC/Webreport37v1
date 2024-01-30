import "./App.css";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import AppWeight, { BigAppWeightMemo } from "./components/weight/AppWeight.jsx";
import AppProduct from "./components/product/AppProduct";
import AppCustomer from "./components/customer/AppCustomer.jsx";
import AppWeighttype from "./components/weighttype/AppWeighttype.jsx";
import AppDriver from "./components/driver/AppDriver.jsx";
import AppTransporter from "./components/transporter/AppTransporter.jsx";
import AppLogin from "./components/login/AppLogin.jsx";
import AppWeightreport from "./components/weightreport/AppWeightreport.jsx";
import AppMain from "./components/main/AppMain.jsx";
import AppUser from "./components/user/AppUser.jsx";
import AppCompany from "./components/company/AppCompany.jsx";
import AppMoistTH from "./components/moistTH/AppMoistTH.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      index: true,
      element: <AppLogin />,
    },
    {
      path: "main",
      element: <AppMain />,
    },
    {
      path: "weight",
      element: <AppWeight />,
    },
    {
      path: "weightreport",
      element: <AppWeightreport />,
    },
    {
      path: "product",
      element: <AppProduct />,
    },
    {
      path: "customer",
      element: <AppCustomer />,
    },
    {
      path: "weighttype",
      element: <AppWeighttype />,
    },
    {
      path: "driver",
      element: <AppDriver />,
    },
    {
      path: "transporter",
      element: <AppTransporter />,
    },
    {
      path: "user",
      element: <AppUser />,
    },
    {
      path: "company",
      element: <AppCompany />,
    },
    {
      path: "moistTH",
      element: <AppMoistTH />,
    },
    {
      path: "login",
      element: <AppLogin />,
    },
    {
      path: "BigAppWeightMemo",
      element: <BigAppWeightMemo />,
    },
  ],
  {
    //basename: "/webreport",
  }
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
