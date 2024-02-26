import "./App.css";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
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
import AppTrdUnt from "./components/trdUnt/AppTrdUnt.jsx";
import AppPacking from "./components/packing/AppPacking.jsx";
import AppTranType from "./components/tranType/AppTranType.jsx";
import AppTransctn from "./components/Transctn/AppTransctn.jsx";

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
      path: "trdUnt",
      element: <AppTrdUnt />,
    },
    {
      path: "packing",
      element: <AppPacking />,
    },
    {
      path: "tranType",
      element: <AppTranType />,
    },
    {
      path: "transctn",
      element: <AppTransctn />,
    },
    {
      path: "login",
      element: <AppLogin />,
    },
  ],
  {
    //basename: "/tww37_pepsii",
    //basename: "/tww37_demo",
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
