import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import Bar from "./Bar";
import Pie from "./Pie";
import Doughnut from "./Doughnut";
import AppCard from "./Cards/AppCard";
import { Card, DonutChart, Title } from "@tremor/react";
import Area from "./Area";
import { data } from "../data/data.jsx";

function AppDashboard() {
  const data1 = [
    {
      SumByProduct: [
        {
          ProductDataID: "Apple",
          ProductID: "A123",
          CountTransaction: 100,
          SumWeightNet: 1000,
          SumAmountNet: 5000,
        },
        {
          ProductDataID: "Banana",
          ProductID: "B456",
          CountTransaction: 200,
          SumWeightNet: 2000,
          SumAmountNet: 10000,
        },
        {
          ProductDataID: "Cherry",
          ProductID: "C789",
          CountTransaction: 300,
          SumWeightNet: 3000,
          SumAmountNet: 15000,
        },
        {
          ProductDataID: "Durian1",
          ProductID: "D101",
          CountTransaction: 400,
          SumWeightNet: 4000,
          SumAmountNet: 20000,
        },
        {
          ProductDataID: "Durian2",
          ProductID: "D101",
          CountTransaction: 300,
          SumWeightNet: 4000,
          SumAmountNet: 15000,
        },
        {
          ProductDataID: "Durian3",
          ProductID: "D101",
          CountTransaction: 200,
          SumWeightNet: 4000,
          SumAmountNet: 11000,
        },
        {
          ProductDataID: "Durian4",
          ProductID: "D101",
          CountTransaction: 100,
          SumWeightNet: 4000,
          SumAmountNet: 8000,
        },
      ],
    },
  ];

  return (
    <>
      <div className="">
        {/* <div className="m-auto w-[90%] flex md:justify-between justify-center flex-wrap gap-2 mt-2"> */}
        <div className="m-auto w-[95%] mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-1">
          {data.map((item, index) =>
            item.SumByProduct.map((product, productIndex) => (
              <AppCard
                key={productIndex}
                title={product.ProductDataID}
                CountTransaction={product.CountTransaction}
                SumWeightNet={product.SumWeightNet}
                SumAmountNet={product.SumAmountNet}
              />
            ))
          )}
        </div>
        <Card
          className="m-auto w-[95%] mt-2 grid grid-cols-1 md:grid-cols-4 gap-1 "
          decoration="top"
          decorationColor="blue"
        >
          <div className="md:col-span-1 ">
            <Doughnut />
          </div>
          <div className="md:col-span-3  ">
            <Bar />
            {/* <Area /> */}
          </div>
        </Card>
      </div>
    </>
  );
}

export default AppDashboard;
