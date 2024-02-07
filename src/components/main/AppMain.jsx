import React, { useEffect } from "react";
//import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AppNavber from "../navbar/AppNavber";
import AppDashboard from "./../dashboard/AppDashboard";
import { useStore } from "../../zustand/Store";

function AppMain() {
  const { zuCheckUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    zuCheckUser(() => navigate("/"));
  }, []);

  return (
    <>
      <div>
        <AppNavber />
        <AppDashboard />
      </div>
    </>
  );
}

export default AppMain;
