import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Pure() {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "ขาย",
        data: datas,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default Pure;
