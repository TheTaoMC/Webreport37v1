import React from "react";
import { AreaChart, Card, Title } from "@tremor/react";
import { data } from "../data/data.jsx";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
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

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};
function Area() {
  return (
    <Card>
      <Title>Newsletter revenue over time (USD)</Title>
      <AreaChart
        className="h-72 mt-4"
        data={data[0].SumByProduct}
        index="ProductDataID"
        yAxisWidth={65}
        categories={["SumAmountNet"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}

export default Area;
