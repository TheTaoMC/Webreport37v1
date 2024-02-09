import React from "react";
import { Card, DonutChart, Title } from "@tremor/react";
import { useStore } from "../../zustand/Store";
function Doughnut({ datas }) {
  const { zu_DataDashboard } = useStore();
  const valueFormatter = (number) =>
    `THB ${new Intl.NumberFormat("us").format(number).toString()}`;

  console.log(zu_DataDashboard.SumByProduct);
  return (
    <Card className="">
      <Title>Doughnut</Title>
      <DonutChart
        className="mt-6  "
        data={zu_DataDashboard.SumByProduct}
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
