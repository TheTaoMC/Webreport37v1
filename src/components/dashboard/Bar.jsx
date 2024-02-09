import React from "react";
import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { useStore } from "../../zustand/Store";
function Bar({ datas }) {
  const { zu_DataDashboard } = useStore();
  const valueFormatter = (number) =>
    `THB ${new Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="">
      <Title>Bar</Title>
      <BarChart
        className="mt-6  h-[25rem]"
        data={zu_DataDashboard.SumByProduct}
        index="ProductID"
        categories={["SumAmountNet"]}
        colors={["blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={110}
      />
    </Card>
  );
}

export default Bar;
