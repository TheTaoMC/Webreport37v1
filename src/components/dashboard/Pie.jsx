import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useStore } from "../../zustand/Store";
ChartJS.register(ArcElement, Tooltip, Legend);
function Piee() {
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

  const data = {
    labels,
    datasets: [
      {
        label: "เป็นเงิน",
        data: datas,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        display: true,
        reverse: true,
        //fullSize: true,
        //maxHeight: 1000,
      },
      title: {
        display: false,
        text: "sdsdd",
      },
    },
  };
  return (
    <div className="card flex justify-content-center">
      <Pie
        options={options}
        data={data}
        className="w-[100%] md:w-30rem overflow-auto"
      />
    </div>
  );
}
export default Piee;
