import React from "react";
import { Card, DonutChart, Title } from "@tremor/react";
import { data } from "../data/data.jsx";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

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
const valueFormatter = (number) =>
  `THB ${new Intl.NumberFormat("us").format(number).toString()}`;
function Doughnut() {
  return (
    <Card className="">
      <Title>SumAmountNet</Title>
      <DonutChart
        className="mt-6  "
        data={data[0].SumByProduct}
        category="SumAmountNet"
        index="ProductDataID"
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
}

export default Doughnut;
