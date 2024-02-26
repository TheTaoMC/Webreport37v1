import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import { useStore } from "../../zustand/Store";
import Barr from "./Bar";
import Piee from "./Pie";
import Doughnut from "./Doughnut";
import AppCard from "./Cards/AppCard";
import { Card, DonutChart, Title } from "@tremor/react";
import { useNavigate } from "react-router-dom";

import Area from "./Area";
//import moment from "moment";
import moment from "moment/min/moment-with-locales";
import Pure from "./Pure";
//import { data } from "../data/data.jsx";

function AppDashboard() {
  const {
    zu_Data,
    zu_DataDashboard,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
  } = useStore();

  const {
    zuFetch,
    zuSetFetch,
    zuSetAdd,
    zuResetData,
    zuSetDel,
    zuSetFromAddEdit,
    zuSetDataID,
    zuSetEdit,
    zuSetColumns,
    zuSetTitle,
    zuCheckUser,
  } = useStore();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  /*   console.log("zu_DataDashboard ", zu_DataDashboard);
  console.log("zu_Data ", zu_Data);
  console.log("data ", data); */

  //Load Data รอบแรก
  const urlapimain = "weightdashboard";
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    const urlread = urlapimain + "/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetTitle("dashboard");
    zuFetch();
    setData(zu_DataDashboard.SumByProduct);
  }, []);

  /*   window.onbeforeunload = (event) => {
    if (event.clientY === 0) {
      localStorage.removeItem("user");
    }
  }; */

/*   useEffect(() => {
    const handleBeforeUnload = (event) => {
      // กำหนดข้อความที่ต้องการแสดงใน popup
      event.returnValue = "คุณแน่ใจว่าต้องการออกจากเว็บไซต์?";
    };

    // เพิ่ม event listener เมื่อ component ถูก mount
    window.addEventListener("beforeunload", handleBeforeUnload);

    // เคลียร์ event listener เมื่อ component ถูก unmount เพื่อป้องกันการรั่วไหลของหน่วยความจำ
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); */

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Perform logout or cleanup actions here
        localStorage.getItem("Tab is being closed or hidden");
        console.log("Tab is being closed or hidden");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center py-4 text-4xl">
          <div>Dashboard</div>
          <div className="text-2xl">
            {"วันที่ " + zu_DataDashboard.DataDate}
          </div>
        </div>
        {/* <div className="m-auto w-[90%] flex md:justify-between justify-center flex-wrap gap-2 mt-2"> */}
        <div className="m-auto w-[95%] mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-1">
          <AppCard />
        </div>

        <Card
          className="m-auto w-[95%]  mt-2 grid grid-cols-1 md:grid-cols-4 gap-1 "
          decoration="top"
          decorationColor="blue"
        >
          <div className="md:col-span-1 ">
            {/* <Doughnut datas={data} /> */}
            <Piee />
          </div>
          <div className="md:col-span-3  ">
            <Barr />
          </div>
        </Card>
      </div>
    </>
  );
}

export default AppDashboard;
