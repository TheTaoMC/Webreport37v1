import React from "react";
import { Card, DonutChart, Title } from "@tremor/react";

function Doughnut({ datas }) {
  const valueFormatter = (number) =>
    `THB ${new Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <Card className="">
      <Title>Doughnut</Title>
      <DonutChart
        className="mt-6  "
        data={datas}
        category="SumAmountNet"
        index="ProductID"
        valueFormatter={valueFormatter}
        colors={[
          "slate",
          "violet",
          "indigo",
          "rose",
          "cyan",
          "amber",
          "pink",
          "emerald",
          "lime",
          "purple",
          "blue",
          "cyan",
          "amber",
          "pink",
          "emerald",
          "lime",
          "purple",
          "blue",
        ]}
      />
    </Card>
  );
}

export default Doughnut;
