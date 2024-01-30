import React, { useState } from "react";

function AppInbound() {
  const [inboundData, setInboundData] = useState({
    VehicleCode: null,
    TicketCode: null,
    TransactionTypeCode: null,
    CompanyCode: null,
    CustomerCode: null,
    ProductCode: null,
    StoreCode: null,
    RFIDTagCode: null,
    InboundDate: null,
    InboundTime: null,
    InboundWeight: null,
    MoistureTableCode: null,
    MoistureDeduct: null,
    Price: null,
    TradingUnit: null,
    KgPerTradingUnit: null,
    Quantity: null,
    PackingCode: null,
    SagWeight: null,
    DeductWeight: null,
    FixedDeductWeight1: null,
    VariedDeductWeight1: null,
    VariedDeductWeight1Factor: null,
    FixedDeductWeight2: null,
    VariedDeductWeight2: null,
    VariedDeductWeight2Factor: null,
    FixedDeductAmount1: null,
    VariedDeductAmount1: null,
    VariedDeductAmount1Factor: null,
    FixedDeductAmount2: null,
    VariedDeductAmount2: null,
    VariedDeductAmount2Factor: null,
    Vat: null,
    Remark1: null,
    Remark2: null,
    Remark3: null,
    Remark4: null,
    InboundUsername: null,
    Cancel: null,
  });
  const columns = [
    {
      field: "VehicleCode",
      header: "เบียนรถ",
    },
    {
      field: "TicketCode",
      header: "เลขที่ชั่ง",
    },
    {
      field: "TransactionTypeCode",
      header: "ประเภทชั่ง",
    },
    {
      field: "CompanyCode",
      header: "บริษัท",
    },
    {
      field: "Cancel",
      header: "สถานะ",
      body: (rowData) => {
        return rowData.Cancel === 0 ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInboundData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return <div>AppInbound</div>;
}

export default AppInbound;
