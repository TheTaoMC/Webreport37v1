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
    //const storedUser = Cookies.get("user");
    //const userData = JSON.parse(storedUser);
    //const res = zuLogin(userData.username, userData.password);
    //console.log(userData);

    /*     if (!storedUser) {
      return;
    } */
    zuCheckUser(() => navigate("/"));
  }, []);

  return (
    <>
      <div>
        <AppNavber />
        <div>
          <AppDashboard />
        </div>
      </div>
    </>
  );
}

export default AppMain;
