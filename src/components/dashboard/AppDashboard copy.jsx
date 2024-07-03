import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useStore } from "../../zustand/Store";
import Bar from "./Bar";
import Pie from "./Pie";
import Doughnut from "./Doughnut";
import AppCard from "./Cards/AppCard";
import { Card, DonutChart, Title } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import Area from "./Area";
//import { data } from "../data/data.jsx";

function AppDashboard() {
  const {
    zu_Api_Key,
    zu_Data,
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

  console.log("data ", data);

  //Load Data รอบแรก
  const urlapimain = "weightdashboard";
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    const urlread = urlapimain + "/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": zu_Api_Key,
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetTitle("dashboard");
    zuFetch();
  }, []);

  useEffect(() => {
    setData(zu_Data.SumByProduct);
  }, [zu_Data]);

  return (
    <>
      <div className="">
        <div className="flex justify-center py-4 text-4xl">Dashboard</div>
        {/* <div className="m-auto w-[90%] flex md:justify-between justify-center flex-wrap gap-2 mt-2"> */}
        <div className="m-auto w-[95%] mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-1">
          {data &&
            data.map((e, i) => (
              <AppCard
                key={e.ProductDataID}
                title={e.ProductID}
                CountTransaction={e.CountTransaction}
                SumWeightNet={e.SumWeightNet}
                SumAmountNet={e.SumAmountNet}
              />
            ))}
        </div>

        <Card
          className="m-auto w-[95%] mt-2 grid grid-cols-1 md:grid-cols-4 gap-1 "
          decoration="top"
          decorationColor="blue"
        >
          <div className="md:col-span-1 ">
            <Doughnut datas={data} />
          </div>
          <div className="md:col-span-3  ">
            <Bar datas={data} />
            {/* <Area /> */}
          </div>
        </Card>
      </div>
    </>
  );
}

export default AppDashboard;
