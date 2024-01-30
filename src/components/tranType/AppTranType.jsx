import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
function AppTranType() {
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
  const [tranTypeData, setTranTypeData] = useState({
    TransactionTypeCode: null,
    TransactionTypeName: null,
    WeighingType: null,
    InboundTicketFormat: null,
    InboundAferOutTicketFormat: null,
    OutboundTicketFormat: null,
    CalAmountFrom: null,
    CalStockFrom: null,
    StockAction: null,
    StockFactor: null,
    LastTickerCode: null,
    StatonCode: null,
    Cancel: false,
  });

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;

    setTranTypeData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  const columns = [
    {
      field: "TransactionTypeCode",
      header: "รหัส",
    },
    {
      field: "TransactionTypeName",
      header: "ชื่อ",
    },
    {
      field: "WeighingType",
      header: "WeighingType",
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
    });
  };

  const resetState = () => {
    setTranTypeData({
      TransactionTypeCode: null,
      TransactionTypeName: null,
      WeighingType: null,
      InboundTicketFormat: null,
      InboundAferOutTicketFormat: null,
      OutboundTicketFormat: null,
      CalAmountFrom: null,
      CalStockFrom: null,
      StockAction: null,
      StockFactor: null,
      LastTickerCode: null,
      StatonCode: null,
      Cancel: false,
    });
  };
  //setState
  useEffect(() => setState(), [zu_ToggleEdit, zu_SelectedList]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const addedit = (
    <div>
      <div>{columns[0].header}</div>
      <div>
        <InputText
          autoFocus
          disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="TableCode"
          defaultValue={moistTHData.TableCode}
          onBlur={handleInputChange}
        />
      </div>
      <div>{columns[1].header}</div>
      <div>
        <InputText
          className="w-[100%]"
          name="StdMoisture"
          defaultValue={moistTHData.StdMoisture}
          onBlur={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={moistTHData.Cancel}
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

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread = "MoistTH/read.php";
    const optionread = {
      method: "GET",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFromAddEdit(addedit);
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ความชื้น");
    zuFetch();
  }, []);

  //Add or Edit
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      console.log("Add...");
      const urladd = "MoistTH/create.php";
      const optionadd = {
        method: "POST",
        headers: {
          "API-KEY": "857F7237C03246028748D51C97D4BADE",
        },
        body: JSON.stringify(moistTHData),
      };
      zuSetDataID(moistTHData.TableCode);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    }
    if (zu_Title_Form_AddEdit === "edit") {
      console.log("Edit...");
      const urledit = "MoistTH/update.php";
      const optionedit = {
        method: "POST",
        headers: {
          "API-KEY": "857F7237C03246028748D51C97D4BADE",
        },
        body: JSON.stringify(moistTHData),
      };
      zuSetDataID(moistTHData.TableCode);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [moistTHData, zu_Title_Form_AddEdit]);

  //Del
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel = "MoistTH/delete.php";
    const optiondel = {
      method: "POST",
      headers: {
        "API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
      body: JSON.stringify({
        TableCode: moistTHData.TableCode,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [moistTHData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"StdMoisture"} minWidth={"10rem"} />
    </div>
  );
}

export default AppTranType;
