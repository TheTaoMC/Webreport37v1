import React from "react";
import { Card } from "@tremor/react";
import { useStore } from "../../../zustand/Store";

function AppCard({ title, CountTransaction, SumWeightNet, SumAmountNet }) {
  const { zu_DataDashboard } = useStore();

  const formattedSumAmountNet = (e) =>
    new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
    }).format(e);

  const formattedSumWeightNet = (e) =>
    new Intl.NumberFormat("th-TH", {}).format(e);

  //console.log(zu_DataDashboard.SumByProduct);
  return (
    <>
      {/* p-4 border rounded-2xl drop-shadow-md bg-blue-300 hover:bg-blue-200 cursor-pointer   */}
      {zu_DataDashboard.SumByProduct &&
        zu_DataDashboard.SumByProduct.map((e, i) => (
          <Card
            key={i}
            className="min-w-[250px] max-w-xs mx-auto "
            decoration="top"
            decorationColor="blue"
          >
            <div className="antialiased font-semibold text-xl">
              {e.ProductID}
            </div>
            <div>
              <div>จำนวน: {e.CountTransaction} คัน</div>
              <div>น้ำหนักรวม: {formattedSumWeightNet(e.SumWeightNet)} กก.</div>
              <div>เงินรวม: {formattedSumAmountNet(e.SumAmountNet)} บาท.</div>
            </div>
          </Card>
        ))}
    </>
  );
}

export default AppCard;
