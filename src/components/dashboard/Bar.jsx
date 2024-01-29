import React from "react";
import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { data } from "../data/data.jsx";
const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
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

function Bar() {
  return (
    <Card className="">
      <Title>Number of species threatened with extinction (2021)</Title>
      <BarChart
        className="mt-6  h-[25rem]"
        data={data[0].SumByProduct}
        index="ProductDataID"
        categories={["SumAmountNet"]}
        colors={["blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}

export default Bar;
