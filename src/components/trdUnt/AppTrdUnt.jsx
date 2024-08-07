import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/Store";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";
function AppTrdUnt() {
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
    TradingUnitCode: null,
    //TradingUnitName: null,
    TradingUnitFactor: "0",
    Cancel: false,
    OldPk: null,
  };

  const [trdUntData, setTrdUntData] = useState(initialData);

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value, checked } = event.target;
    console.log(name, value);

    setTrdUntData((prevData) => ({
      ...prevData,
      [name]: value === null ? checked : value,
    }));
  };

  const columns = [
    {
      field: "TradingUnitCode",
      header: "รหัส",
      footer: (rowData) => {
        return "จำนวน ";
      },
    },
    {
      field: "TradingUnitFactor",
      header: "น้ำหนักต่อ 1 หน่วย",
      align: "right",
      alignHeader: "right",
      body: (rowData) => {
        if (
          rowData.TradingUnitFactor === null ||
          rowData.TradingUnitFactor === undefined
        ) {
          return "0";
        }

        return rowData.TradingUnitFactor.toLocaleString(undefined, {});
      },
      footer: (rowData) => {
        return rowData.props.value.length.toLocaleString() + " รายการ";
      },
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
    setTrdUntData({
      ...zu_SelectedList,
      Cancel: zu_SelectedList.Cancel === 0 ? false : true,
      OldPk: zu_SelectedList.TradingUnitCode,
    });
  };
  console.log(trdUntData);
  const resetState = () => {
    setTrdUntData(initialData);
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
          //disabled={zu_Title_Form_AddEdit === "edit" ? true : false}
          className="w-[100%]"
          name="TradingUnitCode"
          defaultValue={trdUntData.TradingUnitCode}
          onBlur={handleInputChange}
        />
      </div>

      <div>น้ำหนักต่อ 1 หน่วย</div>
      <div>
        <InputNumber
          inputId="integeronly"
          inputClassName="text-right max-w-[10rem]"
          name="TradingUnitFactor"
          value={trdUntData.TradingUnitFactor}
          onValueChange={handleInputChange}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              name="Cancel"
              checked={trdUntData.Cancel}
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
  const urlapimain = "TrdUnt";
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
    zuSetTitle("หน่วย");
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
        body: JSON.stringify(trdUntData),
      };
      zuSetDataID(trdUntData.TradingUnitCode);
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
        body: JSON.stringify(trdUntData),
      };
      zuSetDataID(trdUntData.TradingUnitCode);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [trdUntData, zu_Title_Form_AddEdit]);

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
        TradingUnitCode: trdUntData.TradingUnitCode,
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [trdUntData]);
  return (
    <div>
      <AppNavber />
      <AppTable sortField={"TradingUnitCode"} minWidth={"10rem"} />
    </div>
  );
}

export default AppTrdUnt;
