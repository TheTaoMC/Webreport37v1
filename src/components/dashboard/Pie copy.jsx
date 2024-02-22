import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useStore } from "../../zustand/Store";

function Pie() {
  const { zu_DataDashboard } = useStore();
  const [labels, setLabels] = useState([]);
  const [datas, setdatas] = useState([]);

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

  const documentStyle = getComputedStyle(document.documentElement);
  const data = {
    labels: [
      "123",
      "77777777777777777777",
      "888888888888888888888888",
      "00000000000000000000000000000000000000",
      "77777777777777777777777777777777777777777",
      "5555555555555555555555555555555555555555555555555555",
      "11111111111111111111111111111111111",
      "55555555555555554",
      "123456789",
      "7412541254",
      "444444444444444444444444444444444444",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    ],
    datasets: [
      {
        data: datas,
        backgroundColor: [
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 204, 0, 0.7)",
          "rgba(255, 255, 0, 0.7)",
          "rgba(128, 255, 0, 0.7)",
          "rgba(0, 255, 0, 0.7)",
          "rgba(0, 255, 128, 0.7)",
          "rgba(0, 255, 255, 0.7)",
          "rgba(0, 128, 255, 0.7)",
          "rgba(0, 0, 255, 0.7)",
          "rgba(128, 0, 255, 0.7)",
          "rgba(255, 0, 255, 0.7)",
          "rgba(255, 0, 128, 0.7)",
          "rgba(255, 128, 0, 0.7)",
          "rgba(128, 128, 128, 0.7)",
          "rgba(192, 192, 192, 0.7)",
          "rgba(224, 224, 224, 0.7)",
          "rgba(240, 240, 240, 0.7)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(204, 204, 204, 0.7)",
          "rgba(153, 153, 153, 0.7)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 204, 0, 0.7)",
          "rgba(255, 255, 0, 0.7)",
          "rgba(128, 255, 0, 0.7)",
          "rgba(0, 255, 0, 0.7)",
          "rgba(0, 255, 128, 0.7)",
          "rgba(0, 255, 255, 0.7)",
          "rgba(0, 128, 255, 0.7)",
          "rgba(0, 0, 255, 0.7)",
          "rgba(128, 0, 255, 0.7)",
          "rgba(255, 0, 255, 0.7)",
          "rgba(255, 0, 128, 0.7)",
          "rgba(255, 128, 0, 0.7)",
          "rgba(128, 128, 128, 0.7)",
          "rgba(192, 192, 192, 0.7)",
          "rgba(224, 224, 224, 0.7)",
          "rgba(240, 240, 240, 0.7)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(204, 204, 204, 0.7)",
          "rgba(153, 153, 153, 0.7)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  };
  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={data}
        options={options}
        className="w-[100%] md:w-30rem h-[30vh]"
      />
    </div>
  );
}
export default Pie;
