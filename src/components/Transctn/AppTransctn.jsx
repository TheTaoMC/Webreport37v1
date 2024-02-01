import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
function AppTransctn() {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
  } = useStore();

  const {
    zuFetch,
    zuSetFetch,
    zuSetAdd,
    zuResetData,
    zuSetDel,
    zuSetFromAddEdit,
    zuSetDataID,
    zuSetEdit,
    zuSetColumns,
    zuSetTitle,
    zuCheckUser,
  } = useStore();
  const navigate = useNavigate();

  const initialData = {
    TransactionKey: null,
    TicketCode: null,
    TransactionTypeCode: null,
    VahicleCode: null,
    CompanyCode: null,
    CustomerCode: null,
    ProductCode: null,
    InboundDate: null,
    InboundTime: null,
    InboundWeight: null,
    OutboundDate: null,
    OutboundTime: null,
    OutboundWeight: null,
    Moisture: null,
    MoistureTableCode: null,
    MoistureDeduct: null,
    Price: null,
    TradingUnit: null,
    KgPerTradingUnit: null,
    Quantity: null,
    PackingCode: null,
    SagWeight: null,
    DeductWeight: null,
    VariedDeductWeight1: null,
    VariedDeductWeight2: null,
    FixedDeductAmount1: null,
    VariedDeductAmount1: null,
    FixedDeductAmount2: null,
    VariedDeductAmount2: null,
    Remark1: null,
    Remark2: null,
    Remark3: null,
    Remark4: null,
    InboundUsername: null,
    OutboundUsername: null,
    Cancel: false,
  };

  //แก้
  const [transctnData, setTransctnData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setTransctnData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  //แก้
  const columns = [
    {
      field: "TransactionKey",
      header: "รหัส",
    },
    {
      field: "TicketCode",
      header: "เลขที่ตั๋ว",
    },
    {
      field: "TransactionTypeCode",
      header: "รหัสประเภทชั่ง",
    },
    {
      field: "VahicleCode",
      header: "ทะเบียนรถ",
    },
    {
      field: "CompanyCode",
      header: "รหัสโกดัง",
    },
    {
      field: "CustomerCode",
      header: "รหัสคู่ค้า",
    },
    {
      field: "ProductCode",
      header: "รหัสสินค้า",
    },
    {
      field: "InboundDate",
      header: "วันที่ชั่งเข้า",
    },
    {
      field: "InboundTime",
      header: "เวลาชั่งเข้า",
    },
    {
      field: "InboundWeight",
      header: "น้ำหนักเข้า",
    },
    {
      field: "OutboundDate",
      header: "วันที่ชั่งออก",
    },
    {
      field: "OutboundTime",
      header: "เวลาชั่งออก",
    },
    {
      field: "OutboundWeight",
      header: "น้ำหนักออก",
    },
    {
      field: "Moisture",
      header: "ความชื้น",
    },
    {
      field: "MoistureTableCode",
      header: "รหัสตารางความชื้น",
    },
    {
      field: "MoistureDeduct",
      header: "หักความชื้น",
    },
    {
      field: "Price",
      header: "ราคา",
    },
    {
      field: "TradingUnit",
      header: "หน่วยซื้อขาย",
    },
    {
      field: "KgPerTradingUnit",
      header: "กก.ต่อหน่วย",
    },
    {
      field: "Quantity",
      header: "จำนวน",
    },
    {
      field: "PackingCode",
      header: "รหัสการบรรจุ",
    },
    {
      field: "SagWeight",
      header: "นน.กระสอบ",
    },
    {
      field: "DeductWeight",
      header: "นน.หัก",
    },
    {
      field: "VariedDeductWeight1",
      header: "หักสิ่งเจือปน",
    },
    {
      field: "VariedDeductWeight2",
      header: "สิ่งเจือปนวัดได้",
    },
    {
      field: "FixedDeductAmount1",
      header: "ค่าชั่งเหมา",
    },
    {
      field: "VariedDeductAmount1",
      header: "ค่าชั่งต่อตัน",
    },
    {
      field: "FixedDeductAmount2",
      header: "ค่าลงเหมา",
    },
    {
      field: "VariedDeductAmount2",
      header: "ค่าลงต่อตัน",
    },
    {
      field: "Remark1",
      header: "หมายเหตุ 1",
    },
    {
      field: "Remark2",
      header: "หมายเหตุ 2",
    },
    {
      field: "Remark3",
      header: "หมายเหตุ 3",
    },
    {
      field: "Remark4",
      header: "หมายเหตุ 4",
    },
    {
      field: "InboundUsername",
      header: "ผู้ชั่งเข้า",
    },
    {
      field: "OutboundUsername",
      header: "ผู้ชั่งออก",
    },
    {
      field: "Cancel",
      header: "สถานะ",
      body: (rowData) => {
        return rowData.Cancel === 0 ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];
  const setState = () => {
    setTransctnData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel === 0 ? false : true,
    });
  };

  const resetState = () => {
    setTransctnData(initialData);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  //แก้
  const addedit = (
    <div>
      <div>{columns[0].header} </div>
      <div>
        <InputText
          autoFocus
          disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="TransactionKey"
          defaultValue={transctnData.TransactionKey}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="TicketCode"
          defaultValue={transctnData.TicketCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[2].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="TransactionTypeCode"
          defaultValue={transctnData.TransactionTypeCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={transctnData.Cancel}
              onChange={handleInputChange}
            />
            <label htmlFor="ingredient1" className="">
              ยกเลิก
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const urlapimain = "Transctn";
  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread = urlapimain + "/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ข้อมูลชั่งน้ำหนัก");
    zuFetch();
  }, []);

  //Add or Edit
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      console.log("Add...");
      const urladd = urlapimain + "/create.php";
      const optionadd = {
        method: "POST",
        headers: {
          "API-KEY": "857F7237C03246028748D51C97D4BADE",
        },
        body: JSON.stringify(transctnData),
      };
      zuSetDataID(transctnData.TransactionKey);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    }
    if (zu_Title_Form_AddEdit === "edit") {
      console.log("Edit...");
      const urledit = urlapimain + "/update.php";
      const optionedit = {
        method: "POST",
        headers: {
          "API-KEY": "857F7237C03246028748D51C97D4BADE",
        },
        body: JSON.stringify(transctnData),
      };
      zuSetDataID(transctnData.TransactionKey);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [transctnData, zu_Title_Form_AddEdit]);

  //Del
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel = urlapimain + "/delete.php";
    const optiondel = {
      method: "POST",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
      body: JSON.stringify({
        TransactionKey: transctnData.TransactionKey,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [transctnData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"TransactionKey"} minWidth={"10rem"} />
    </div>
  );
}

export default AppTransctn;
