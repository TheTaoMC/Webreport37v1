import React from "react";
import { Card } from "@tremor/react";

function AppCard({ title, CountTransaction, SumWeightNet, SumAmountNet }) {
  const formattedSumAmountNet = new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
  }).format(SumAmountNet);
  const formattedSumWeightNet = new Intl.NumberFormat("th-TH", {}).format(
    SumWeightNet
  );

  return (
    <>
      {/* p-4 border rounded-2xl drop-shadow-md bg-blue-300 hover:bg-blue-200 cursor-pointer   */}
      <Card
        className="min-w-[250px] max-w-xs mx-auto "
        decoration="top"
        decorationColor="blue"
      >
        <div className="antialiased font-semibold text-xl">{title}</div>
        <div>
          <div>จำนวน: {CountTransaction} คัน</div>
          <div>น้ำหนักรวม: {formattedSumWeightNet} กก.</div>
          <div>SumAmountNet: {formattedSumAmountNet} บาท.</div>
        </div>
      </Card>
    </>
  );
}

export default AppCard;
