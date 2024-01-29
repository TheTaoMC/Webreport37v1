import React from "react";
//import { Card } from "primereact/card";
import { Card } from "@tremor/react";

function AppCard({ title, CountTransaction, SumWeightNet, SumAmountNet }) {
  return (
    <>
      {/*       <Card
        title={title}
        className="w-[18rem] rounded-3xl  "
        pt={{
          body: {
            className:
              "bg-blue-300 hover:bg-blue-200 cursor-pointer rounded-3xl",
          },
        }}
      >
        <div>
          <div>จำนวน: {CountTransaction} คัน</div>
          <div>น้ำหนักรวม: {SumWeightNet} กก.</div>
          <div>SumAmountNet: {SumAmountNet} บาท.-</div>
        </div>
      </Card> */}
      {/* p-4 border rounded-2xl drop-shadow-md bg-blue-300 hover:bg-blue-200 cursor-pointer   */}
      <Card  className="min-w-[250px] max-w-xs mx-auto " decoration="top" decorationColor="blue">
        <div className="antialiased font-semibold text-xl">{title}</div>
        <div>
          <div>จำนวน: {CountTransaction} คัน</div>
          <div>น้ำหนักรวม: {SumWeightNet} กก.</div>
          <div>SumAmountNet: {SumAmountNet} บาท.-</div>
        </div>
      </Card>
    </>
  );
}

export default AppCard;
