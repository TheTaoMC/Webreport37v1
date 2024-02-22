import React, { useEffect, useState } from "react";
import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { useStore } from "../../zustand/Store";
import { Chart } from "primereact/chart";
function Bar() {
  const { zu_DataDashboard } = useStore();
  //console.log(zu_DataDashboard.SumByProduct);
  const valueFormatter = (number) =>
    `THB ${new Intl.NumberFormat("us").format(number).toString()}`;

  /*   const x1 = zu_DataDashboard;
  const x2 = zu_DataDashboard.SumByProduct;

  console.log("x ", x1); */

  const [labels, setLabels] = useState([]);
  const [datas, setdatas] = useState([]);
  console.log("labels ", labels);
  console.log("datas ", datas);

  useEffect(() => {
    if (zu_DataDashboard && zu_DataDashboard.SumByProduct) {
      const productName = zu_DataDashboard.SumByProduct.map(
        (product) => product.ProductID
      );
      setLabels(productName);
    }

    if (zu_DataDashboard && zu_DataDashboard.SumByProduct) {
      const SumAmountNet = zu_DataDashboard.SumByProduct.map(
        (product) => product.SumAmountNet
      );
      setdatas(SumAmountNet);
    }
  }, [zu_DataDashboard]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "ขาย",
        data: datas,
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 204, 0, 0.2)",
          "rgba(255, 255, 0, 0.2)",
          "rgba(128, 255, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 255, 128, 0.2)",
          "rgba(0, 255, 255, 0.2)",
          "rgba(0, 128, 255, 0.2)",
          "rgba(0, 0, 255, 0.2)",
          "rgba(128, 0, 255, 0.2)",
          "rgba(255, 0, 255, 0.2)",
          "rgba(255, 0, 128, 0.2)",
          "rgba(255, 128, 0, 0.2)",
          "rgba(128, 128, 128, 0.2)",
          "rgba(192, 192, 192, 0.2)",
          "rgba(224, 224, 224, 0.2)",
          "rgba(240, 240, 240, 0.2)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(204, 204, 204, 0.2)",
          "rgba(153, 153, 153, 0.2)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 204, 0, 0.2)",
          "rgba(255, 255, 0, 0.2)",
          "rgba(128, 255, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 255, 128, 0.2)",
          "rgba(0, 255, 255, 0.2)",
          "rgba(0, 128, 255, 0.2)",
          "rgba(0, 0, 255, 0.2)",
          "rgba(128, 0, 255, 0.2)",
          "rgba(255, 0, 255, 0.2)",
          "rgba(255, 0, 128, 0.2)",
          "rgba(255, 128, 0, 0.2)",
          "rgba(128, 128, 128, 0.2)",
          "rgba(192, 192, 192, 0.2)",
          "rgba(224, 224, 224, 0.2)",
          "rgba(240, 240, 240, 0.2)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(204, 204, 204, 0.2)",
          "rgba(153, 153, 153, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Card className="">
      <Title></Title>
      {/*       <BarChart
        className="mt-6  h-[25rem]"
        data={zu_DataDashboard.SumByProduct}
        index="ProductID"
        categories={["SumAmountNet"]}
        colors={["blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={110}
      /> */}
      <Chart type="bar" data={data} options={options} />
    </Card>
  );
}

export default Bar;
