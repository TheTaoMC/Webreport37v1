import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
function AppTranType() {
  const {
    zu_Api_Key,
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
    TransactionTypeCode: null,
    TransactionTypeName: null,
    WeighingType: null,
    InboundTicketFormat: null,
    InboundAfterOutTicketFormat: null,
    OutboundTicketFormat: null,
    StockFactor: "1",
    LastTicketCode: null,
    Cancel: false,
    OldPk: null,
  };

  //แก้
  const [tranTypeData, setTranTypeData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setTranTypeData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  //แก้
  const columns = [
    {
      field: "TransactionTypeCode",
      header: "รหัส",
      footer: (rowData) => {
        return "จำนวน ";
      },
    },
    {
      field: "TransactionTypeName",
      header: "ชื่อ",
      minWidth: "10rem",
      footer: (rowData) => {
        return rowData.props.value.length.toLocaleString() + " รายการ";
      },
    },
    {
      field: "WeighingType",
      header: "วิธีการชั่ง",
      minWidth: "15rem",
    },
    {
      field: "InboundTicketFormat",
      header: "File บัตรชั่งเข้า",
      minWidth: "15rem",
    },
    {
      field: "InboundAfterOutTicketFormat",
      header: "File บัตรชั่งเข้าหลังชั่งออกแล้ว",
      minWidth: "16rem",
    },
    {
      field: "OutboundTicketFormat",
      header: "File บัตรชั่งออก",
      minWidth: "15rem",
    },
    {
      field: "StockFactor",
      header: "สัมประสิทธิ Stock",
      minWidth: "12rem",
      align: "right",
      alignHeader: "right",
    },
    {
      field: "LastTicketCode",
      header: "เลขที่ชั่งล่าสุด",
      minWidth: "15rem",
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
    setTranTypeData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel === 0 ? false : true,
      OldPk: zu_SelectedList.TransactionTypeCode,
    });
  };

  const resetState = () => {
    setTranTypeData(initialData);
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  //แก้
  const addedit = (
    <div>
      <div>{columns[0].header}</div>
      <div>
        <InputText
          autoFocus
          //disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="TransactionTypeCode"
          defaultValue={tranTypeData.TransactionTypeCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="TransactionTypeName"
          defaultValue={tranTypeData.TransactionTypeName}
          onBlur={handleInputChange}
        />
      </div>
      <div>วิธีการชั่ง</div>
      <div>
        <Dropdown
          className="w-[100%]"
          name="WeighingType"
          value={tranTypeData.WeighingType}
          options={[
            {
              name: "ชั่งน้ำหนักทั้งรถหนักและรถเบา",
              value: "ชั่งน้ำหนักทั้งรถหนักและรถเบา",
            },
            { name: "ชั่งน้ำหนักครั้งเดียว", value: "ชั่งน้ำหนักครั้งเดียว" },
          ]}
          optionLabel="name"
          onChange={handleInputChange}
        />
      </div>
      <div>{columns[3].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="InboundTicketFormat"
          defaultValue={tranTypeData.InboundTicketFormat}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[4].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="InboundAfterOutTicketFormat"
          defaultValue={tranTypeData.InboundAfterOutTicketFormat}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[5].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="OutboundTicketFormat"
          defaultValue={tranTypeData.OutboundTicketFormat}
          onBlur={handleInputChange}
        />
      </div>
      <div>สัมประสิทธิ Stock</div>
      <div>
        <InputNumber
          inputClassName="text-right max-w-[10rem]"
          name="StockFactor"
          value={tranTypeData.StockFactor}
          defaultValue={tranTypeData.StockFactor}
          onBlur={handleInputChange}
        />
      </div>

      <div>{columns[7].header}</div>
      <div>
        <InputText
          className="max-w-[10rem]"
          name="LastTicketCode"
          defaultValue={tranTypeData.LastTicketCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={tranTypeData.Cancel}
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

  const urlapimain = "TranType";
  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread = urlapimain + "/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": zu_Api_Key,
      },
    };
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ประเภทชั่ง");
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
          "API-KEY": zu_Api_Key,
        },
        body: JSON.stringify(tranTypeData),
      };
      zuSetDataID(tranTypeData.TransactionTypeCode);
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
          "API-KEY": zu_Api_Key,
        },
        body: JSON.stringify(tranTypeData),
      };
      zuSetDataID(tranTypeData.TransactionTypeCode);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [tranTypeData, zu_Title_Form_AddEdit]);

  //Del
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel = urlapimain + "/delete.php";
    const optiondel = {
      method: "POST",
      headers: {
        "API-KEY": zu_Api_Key,
      },
      body: JSON.stringify({
        TransactionTypeCode: tranTypeData.TransactionTypeCode,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [tranTypeData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"PackingName"} minWidth={"50rem"} />
    </div>
  );
}

export default AppTranType;
